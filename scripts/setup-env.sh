#!/bin/bash

if [ ! -f ".env" ]; then
    cat > .env << EOL
MNEMONIC="your mnemonic phrase here"
TONCENTER_API_KEY="your api key here"
NETWORK=testnet  # or mainnet
EOL
    echo ".env file created. Please update with your values."
else
    echo ".env file already exists."
fi

chmod +x scripts/setup-env.sh