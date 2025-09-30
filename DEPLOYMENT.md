# GitGlyph Deployment Guide 🚀

## Pre-Deployment Checklist

### 1. Smart Contract Deployment (Thirdweb)

**Step 1: Visit Thirdweb Dashboard**
- Go to [https://thirdweb.com/dashboard](https://thirdweb.com/dashboard)
- Connect your wallet (make sure it has MATIC for gas fees)

**Step 2: Deploy NFT Drop Contract**
- Click "Deploy new contract"
- Select "NFT Drop" under the NFT category
- Fill in contract details:
  ```
  Name: GitGlyph Artifacts
  Symbol: GLYPH
  Description: Collectible NFTs created from GitHub Gists
  Image: (Upload a logo image)
  ```
- Select "Polygon" as the network
- Deploy the contract

**Step 3: Configure Contract Settings**
- Set royalty fees (suggested: 5% to contract owner)
- Configure claim conditions (public minting)
- Copy the contract address for environment variables

### 2. Environment Setup

**Required Environment Variables:**

```bash
# Bundlr/Arweave Configuration
BUNDLR_PRIVATE_KEY=your_wallet_private_key_with_matic_balance

# WalletConnect Project ID (from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Contract Address (from Thirdweb deployment)
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...your_contract_address
```

**Bundlr Wallet Setup:**
1. Create a new wallet or use existing
2. Send 0.1-0.5 MATIC to the wallet address
3. Export private key and add to BUNDLR_PRIVATE_KEY

**WalletConnect Setup:**
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create new project
3. Copy Project ID to NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

### 3. Vercel Deployment

**Step 1: Prepare Repository**
```bash
# Commit all changes
git add .
git commit -m "Complete GitGlyph dApp implementation"
git push origin main
```

**Step 2: Deploy to Vercel**
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Step 3: Configure Environment Variables in Vercel**
- Go to Vercel dashboard → Project → Settings → Environment Variables
- Add all environment variables from .env.local
- Redeploy to apply changes

### 4. Domain Configuration (Optional)

**Custom Domain Setup:**
1. In Vercel dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate generation

**Recommended domains:**
- gitglyph.com
- gitglyph.app
- gitglyph.xyz

### 5. Testing Checklist

**Pre-Launch Testing:**
- [ ] Homepage loads correctly
- [ ] Can input and validate gist URLs
- [ ] Gist pages render with proper formatting
- [ ] Wallet connection works
- [ ] Arweave publishing works (with funded wallet)
- [ ] NFT minting works (on testnet first)
- [ ] All links and navigation work
- [ ] Mobile responsiveness
- [ ] Error handling works

**Test Gist URLs:**
Use real public gists for testing:
```
https://gist.github.com/torvalds/1f93de8d3e5cc1aa8d37
https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
```

### 6. Launch Preparation

**Social Media Assets:**
- Create demo GIF showing complete workflow
- Screenshot of beautiful gist rendering
- Logo and branding assets
- Product Hunt teaser content

**Product Hunt Launch:**
- Schedule launch for Tuesday-Thursday
- Prepare maker comment
- Notify community/network
- Create Twitter announcement thread

### 7. Monitoring & Analytics

**Post-Launch Monitoring:**
- Vercel Analytics for performance
- Wallet connection success rates
- Arweave upload success rates
- Contract interaction monitoring
- User feedback collection

## Quick Commands Reference

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run lint               # Run linting

# Deployment
vercel --prod              # Deploy to production
vercel logs               # View deployment logs
vercel env add            # Add environment variable
```

## Troubleshooting

**Common Issues:**

1. **"Insufficient funds" error**
   - Ensure Bundlr wallet has MATIC balance
   - Check Polygon network connectivity

2. **Contract interaction fails**
   - Verify contract address in environment
   - Check user's wallet is on Polygon network
   - Ensure contract is verified on Polygonscan

3. **Gist not found**
   - Verify gist is public
   - Check GitHub API rate limits
   - Validate gist URL format

4. **Build errors**
   - Run `npm run lint` to check for issues
   - Verify all environment variables are set
   - Check Next.js compatibility

## Success Metrics

**Launch Day Goals:**
- 100+ unique visitors
- 10+ successful gist transformations
- 5+ NFTs minted
- Product Hunt top 10 ranking
- Social media engagement

**Week 1 Goals:**
- 1000+ unique visitors
- 100+ gists published
- 50+ NFTs minted
- Community feedback integration

---

**Ready for launch!** 🚀 The GitGlyph dApp is complete and ready to transform GitHub Gists into beautiful, permanent, collectible NFTs.