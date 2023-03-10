export type FlappyBird = {
  "version": "0.1.0",
  "name": "flappy_bird",
  "instructions": [
    {
      "name": "mintReward",
      "accounts": [
        {
          "name": "mintAuth",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMintAuth",
      "msg": "mint authority account passed is incorrect"
    },
    {
      "code": 6001,
      "name": "InvalidRewardMint",
      "msg": "reward mint account passed is incorrect"
    }
  ]
};

export const IDL: FlappyBird = {
  "version": "0.1.0",
  "name": "flappy_bird",
  "instructions": [
    {
      "name": "mintReward",
      "accounts": [
        {
          "name": "mintAuth",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMintAuth",
      "msg": "mint authority account passed is incorrect"
    },
    {
      "code": 6001,
      "name": "InvalidRewardMint",
      "msg": "reward mint account passed is incorrect"
    }
  ]
};
