export type FlappyBird = {
  "version": "0.1.0",
  "name": "flappy_bird",
  "instructions": [
    {
      "name": "createUserAccount",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAccount",
          "isMut": true,
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
          "name": "userName",
          "type": "string"
        }
      ]
    },
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
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
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
  "accounts": [
    {
      "name": "userDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "level",
            "type": "u8"
          },
          {
            "name": "rewardEarned",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UserNameTooLong",
      "msg": "user name can have atmost 20 characters"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuth",
      "msg": "mint authority account passed is incorrect"
    },
    {
      "code": 6002,
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
      "name": "createUserAccount",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAccount",
          "isMut": true,
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
          "name": "userName",
          "type": "string"
        }
      ]
    },
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
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
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
  "accounts": [
    {
      "name": "userDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "level",
            "type": "u8"
          },
          {
            "name": "rewardEarned",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UserNameTooLong",
      "msg": "user name can have atmost 20 characters"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuth",
      "msg": "mint authority account passed is incorrect"
    },
    {
      "code": 6002,
      "name": "InvalidRewardMint",
      "msg": "reward mint account passed is incorrect"
    }
  ]
};
