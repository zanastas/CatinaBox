# Cat In A Box - ETHGlobal Bangkok 2024 

<p align="center">
  <img src="https://github.com/user-attachments/assets/83f2ad7a-ad0e-43c1-a9b6-50d8da665810" width="200" alt="CatinaBox">
</p>

Cat In A Box is a DeSci and SocialFi platform empowering anyone to participate in community science and decentralized experiments. It 
incentivizes users to share private health data securely and engage in citizen science projects tailored to their interests. Built at ETHGlobal Bangkok, Nov 2024.

### Problem: 
Scientific discoveries take too long to reach practical use for the average users, especially for those seeking personalized health solutions. Most insights are limited to scientists or biohackers, often inaccessible or irrelevant to everyday users. Public participation in scientific studies is low due to a lack of incentives, understanding, and engaging social features, leading to a shortage of diverse, high-quality data for innovation.

### Solution:
Cat In A Box enables average users to:
- Participate in scientific studies with minimal cost and earn rewards in crypto
- Engage in community-driven experiments (e.g., pharmacogenomics, nutrition, personalized healthcare).
- Own and control their health data while contributing to collective knowledge.

And it allows BioDAOs/ DeSci communities to:
- Easily set up citizen science projects and recruit users 
- Foster transparent experimentation and data collection
- Privately store and analyze data

### Product Features:
1. 100% User-Owned Data: Health data encrypted and stored on-chain in decentralized storage, under a single user wallet.
2. User-Controlled Data Sharing:
	- Users share specific data as needed (e.g., a single SNP for an experiment) and earn crypto rewards.
	- Data processing occurs in TEE to ensure privacy 
3. Intuitive UX/UI built for Desci projects:
	- Social login via Dynamic as individual user or community.
	- DeSci organizations can seamlessly create experiments 
	- AI agent assists users in understanding their participation and results.
4. Social Engagement:
	- Share results with friends, compare personal data to community data
	- Leaderboard 
5. Scientist-lead Experimentation :
	- Scientists can participate and guide experiment designs while maintaining anonymity.

### Technical implementation:
- Filecoin and Lighthouse for encrypted and decentralized data storage
- Phala for TEE (Trusted Execution Environment) computation
- Dynamic wallet
- Deployed on the Zircuit testnets and verified via the Zircuit Explorer (https://explorer.testnet.zircuit.com/address/0x0074690aC91AbF6a5E2c1E410160582D92E6a2bE?activeTab=3
https://explorer.testnet.zircuit.com/address/0x0AEB92fB117206D3ae314dFC442db6Bcd98b4309?activeTab=3) Details: We deployed our smart contracts on Zircuit which are used as  experiment management, data access control for encrypted data stored on Filecoin and to pay the users.
The TEE is watching for contract events which trigger data validation, and encrypted partial data sharing, the result is send back to the contract on Zircuit to allow data decryption for the experiment creator.
- Deployed on Scroll testnet and verifed on Blockscout (https://scroll-sepolia.blockscout.com/address/0xb636c074c42F383EE418a3fFF57e07b67274730A
https://scroll-sepolia.blockscout.com/address/0xD6e4FC9f0Ab4407024d86D0349Acb3b9567BD0Bf) 

### Team:
@zanastas - product design, frontend, UI/UX
@0xAkuti - backend, smart contract
