**Step 1.**  

Set up a virtual machine somewhere, for example Google Cloud. Log in with SSH client.

Clone the repo
```bash
git clone git@github.com:sorosbot-com/sorosbot.com.git
```

**Step 2.**  

Install docker for your OS.
Commands for installing docker on Debian from https://docs.docker.com/engine/install/debian/
```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# Add Docker’s official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# set up repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
# setup docker engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**Step 3.**  

Copy the env file, configure and run docker.
```bash
cp .env.prod .env
```
Create `google-cloud.json` in root dir using service account credentials from GCP.

Run docker.
```bash
docker compose up -d
```
Wait for the process to complete, this may take a while as all containers need to be built. I see a need for uploading prebuild images onto a container registry for convenience.

**Step 4.**  

Check whether all containers are running correctly and resolve any errors.
```bash
docker ps -a
```

**Step 5.**  

Reconfigure the firewall, open port 443. Edit DNS records for target domain and site is ready.
Make sure to allow HTTP port 80 as well as 443 in the VPC Firewall settings.
Turn off automatic HTTPS rewrites in CDN (for example Cloudflare).
Turn off SSL settings in Cloudflare so that the `nginx-proxy-le` Let's Encrypt certificate can be issues by completing the WKT challenge.

```bash
docker logs nginx-proxy-le
```
After the WKT challenge is complete, port 80 can be closed and SSL can be enabled, as well as auto HTTPS rewrites.