# 2026-05-25 GitHub Pages Certificate Common Name Bugfix

## Exact issue

Chrome is blocking `https://www.cheminventory.co` with:

```text
NET::ERR_CERT_COMMON_NAME_INVALID
Your connection is not private
Attackers might be trying to steal your information from www.cheminventory.co
```

This means the HTTPS certificate returned by the server does not list `www.cheminventory.co` as a valid hostname.

## Evidence gathered

Initial live certificate check on 2026-05-25:

```bash
printf '' | openssl s_client -servername www.cheminventory.co -connect www.cheminventory.co:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

Observed result:

```text
subject=CN=*.github.io
issuer=C=US, O=Let's Encrypt, CN=R12
notBefore=Apr  6 23:32:36 2026 GMT
notAfter=Jul  5 23:32:35 2026 GMT
X509v3 Subject Alternative Name:
    DNS:*.github.com, DNS:*.github.io, DNS:*.githubusercontent.com, DNS:github.com, DNS:github.io, DNS:githubusercontent.com
```

`www.cheminventory.co` is not present in the certificate's Subject Alternative Name list.

DNS currently points the domain at GitHub Pages:

```text
www.cheminventory.co CNAME juntotechnologies.github.io.
cheminventory.co     CNAME juntotechnologies.github.io.
```

`curl` confirms the same failure:

```text
curl: (60) SSL: no alternative certificate subject name matches target host name 'www.cheminventory.co'
```

Follow-up check after reviewing GitHub Pages settings:

- GitHub Pages is configured for the apex custom domain `cheminventory.co`.
- The repo settings show `DNS check successful`.
- `Enforce HTTPS` is enabled.
- GitHub says the site is live at `https://cheminventory.co/`.

Fresh terminal verification later on 2026-05-25:

```text
https://cheminventory.co      HTTP/2 200
https://www.cheminventory.co  HTTP/2 301 -> https://cheminventory.co/
```

The refreshed `www` certificate now includes both names:

```text
subject=CN=cheminventory.co
issuer=C=US, O=Let's Encrypt, CN=R12
notBefore=May 25 16:30:31 2026 GMT
notAfter=Aug 23 16:30:30 2026 GMT
X509v3 Subject Alternative Name:
    DNS:cheminventory.co, DNS:www.cheminventory.co
```

## Current hypothesis

The domain DNS points to GitHub Pages and GitHub Pages is configured for the apex domain `cheminventory.co`.

The original error was most likely caused by a temporary mismatch while GitHub Pages was still provisioning or propagating the HTTPS certificate for the `www.cheminventory.co` redirect.

The most likely causes are:

- GitHub had provisioned the apex certificate before the `www` SAN/redirect certificate was fully available.
- A browser, local network, ISP resolver, or GitHub edge node cached the earlier generic `*.github.io` certificate path.
- The user visited `www.cheminventory.co` while the GitHub Pages setting was canonicalized to `cheminventory.co`, before the redirect certificate was ready.

## Relevant GitHub Pages behavior

GitHub's docs say:

- `www` subdomains should use a `CNAME` record pointing at the GitHub Pages default domain.
- Apex domains usually use `A`, `ALIAS`, or `ANAME` records.
- GitHub Pages can serve HTTPS for custom domains when the custom domain and DNS records are configured correctly.
- After configuring a custom domain, HTTPS can take up to an hour to become available.
- For GitHub Actions Pages deployments, a repository `CNAME` file is ignored and is not required; the custom domain is managed in GitHub Pages settings.

Docs:

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## Methodical checklist

### 1. Confirm the intended canonical domain

- [ ] Decide whether the site should be canonical at `www.cheminventory.co` or `cheminventory.co`.
- [x] Current GitHub Pages setting uses `cheminventory.co`.
- [ ] Record whether this should remain apex-canonical or change to `www`: `TBD`.

### 2. Check GitHub Pages settings

- [ ] Open the GitHub repository for this site.
- [ ] Go to `Settings -> Pages`.
- [x] Confirm the site is deployed from GitHub Actions.
- [x] Confirm `Custom domain` is set to `cheminventory.co`.
- [x] Confirm `DNS check successful`.
- [x] Confirm `Enforce HTTPS` is enabled.
- [ ] If changing the canonical domain to `www.cheminventory.co`, update the custom domain field and wait for certificate provisioning again.

### 3. Check DNS records

For canonical `www.cheminventory.co`:

- [ ] Confirm `www` is a `CNAME` to `juntotechnologies.github.io`.
- [ ] Confirm there are no conflicting `A`, `AAAA`, or duplicate `CNAME` records for `www`.

For apex `cheminventory.co`:

- [ ] Prefer GitHub's documented apex records if the DNS provider supports them.
- [ ] Use GitHub Pages `A` records for apex if not using `ALIAS` or `ANAME`.
- [ ] Avoid using an apex `CNAME` unless the DNS provider explicitly implements CNAME flattening correctly.
- [ ] Confirm there are no old records pointing apex to another host.

### 4. Trigger/monitor HTTPS provisioning

- [ ] In `Settings -> Pages`, wait until GitHub shows the custom domain DNS check passing.
- [ ] Wait up to 1 hour for certificate provisioning after the domain is configured.
- [ ] Once available, enable or re-enable `Enforce HTTPS`.
- [ ] If `Enforce HTTPS` is disabled and unavailable, wait and refresh the Pages settings.

### 5. Verify from terminal

Run:

```bash
dig +short www.cheminventory.co CNAME
dig +short www.cheminventory.co A
dig +short cheminventory.co A
curl -I https://www.cheminventory.co
printf '' | openssl s_client -servername www.cheminventory.co -connect www.cheminventory.co:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

Expected success criteria:

- [x] `curl -I https://cheminventory.co` returns `HTTP/2 200`.
- [x] `curl -I https://www.cheminventory.co` returns HTTP headers without certificate errors.
- [x] `https://www.cheminventory.co` redirects to `https://cheminventory.co/`.
- [x] The certificate Subject Alternative Name includes `DNS:www.cheminventory.co`.
- [ ] The browser no longer shows `NET::ERR_CERT_COMMON_NAME_INVALID`.

### 6. If it still fails after an hour

- [ ] Remove and re-add the custom domain in GitHub Pages settings to trigger a fresh certificate request.
- [ ] Check for CAA DNS records that might block Let's Encrypt certificate issuance.
- [ ] Confirm the domain is not configured as a custom domain on another GitHub Pages repository.
- [ ] Confirm the deployed Pages URL in the workflow environment points to the expected repository.
- [ ] Try GitHub's Pages troubleshooting flow in the repo settings.

## Likely fix

No repo code change appears necessary.

The current GitHub Pages settings are valid for an apex-canonical site:

- Canonical site: `https://cheminventory.co/`
- `www` behavior: redirects to apex
- HTTPS: enabled
- Latest verified certificate: includes both `cheminventory.co` and `www.cheminventory.co`

If Chrome still shows the warning, try a hard refresh, an incognito window, a different network, or waiting for stale certificate/DNS cache to clear. If the warning persists after that, re-run the terminal verification commands and compare the certificate Subject Alternative Name output.

## Visitor risk and launch guidance

The concern is valid: if a new visitor sees a browser security warning, they may lose trust and leave before reaching the site.

Current verification suggests new visitors should now be okay because:

- `https://cheminventory.co` returns `HTTP/2 200`.
- `https://www.cheminventory.co` redirects to `https://cheminventory.co/`.
- The active certificate includes both `cheminventory.co` and `www.cheminventory.co`.

Recommended public-linking approach:

- [ ] Use `https://cheminventory.co/` as the public URL for now because that is the canonical domain configured in GitHub Pages.
- [ ] Avoid promoting `https://www.cheminventory.co/` until it has stayed clean across repeated checks.
- [ ] Re-test from a private/incognito browser window.
- [ ] Re-test from a phone on cellular data, not the same Wi-Fi.
- [ ] Re-test with another person or an external uptime/SSL checker if available.
- [ ] Wait a few hours after any GitHub Pages custom domain or DNS changes before sending the URL broadly.
- [ ] If any tester still sees `NET::ERR_CERT_COMMON_NAME_INVALID`, pause sharing the link and re-check the certificate SAN output.

Quick confidence check:

```bash
curl -I https://cheminventory.co
curl -I https://www.cheminventory.co
printf '' | openssl s_client -servername www.cheminventory.co -connect www.cheminventory.co:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

The key thing to see is:

```text
DNS:cheminventory.co, DNS:www.cheminventory.co
```

## Recurrence expectations

GitHub Pages certificates are managed automatically. Routine certificate renewal should not cause visitors to see `NET::ERR_CERT_COMMON_NAME_INVALID`.

This warning is most likely during setup or configuration changes, such as:

- Adding or changing the GitHub Pages custom domain.
- Adding or changing DNS records for the apex or `www` host.
- Toggling HTTPS settings while a certificate is still being issued.
- Moving the domain between repositories or GitHub organizations.
- DNS/CAA changes that prevent Let's Encrypt from issuing or renewing the certificate.

For normal operation, the certificate should renew before expiration without manual action. If the site has been stable and no DNS/GitHub Pages settings changed, a sudden recurrence would be abnormal and should be investigated.
