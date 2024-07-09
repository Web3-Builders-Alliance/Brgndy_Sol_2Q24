/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/funder_dao.json`.
 */
export type FunderDao = {
  "address": "6bZMZ4ErD1ZziPqadLQ7Nfr1c1UrQ27iuE4hogFpSsqA",
  "metadata": {
    "name": "funderDao",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createVoting",
      "discriminator": [
        80,
        167,
        83,
        59,
        173,
        210,
        195,
        40
      ],
      "accounts": [
        {
          "name": "projectMaker",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "votingState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "projectMaker"
              },
              {
                "kind": "arg",
                "path": "projectName"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "projectName",
          "type": "string"
        },
        {
          "name": "votingEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "finishVoting",
      "discriminator": [
        184,
        50,
        23,
        103,
        235,
        225,
        121,
        246
      ],
      "accounts": [
        {
          "name": "caller",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "votingState",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "voting_state.project_maker",
                "account": "votingState"
              },
              {
                "kind": "account",
                "path": "voting_state.project_name",
                "account": "votingState"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "platformAuth",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "platformAuth"
              },
              {
                "kind": "arg",
                "path": "platformSeed"
              }
            ]
          }
        },
        {
          "name": "platformMint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "platformSeed",
          "type": "u64"
        },
        {
          "name": "daysToUnstake",
          "type": "i64"
        }
      ]
    },
    {
      "name": "stake",
      "discriminator": [
        206,
        176,
        202,
        18,
        200,
        209,
        179,
        108
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "platformMint"
        },
        {
          "name": "voterAta",
          "writable": true
        },
        {
          "name": "voterStakedAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "voterData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voterStakedAta"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "startUnstaking",
      "discriminator": [
        4,
        13,
        166,
        254,
        43,
        199,
        159,
        117
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "platformMint"
        },
        {
          "name": "voterAta",
          "writable": true
        },
        {
          "name": "voterStakedAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "voterData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voterStakedAta"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "discriminator": [
        90,
        95,
        107,
        42,
        205,
        124,
        50,
        225
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "platformMint"
        },
        {
          "name": "voterAta",
          "writable": true
        },
        {
          "name": "voterStakedAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "voterData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voterStakedAta"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "vote",
      "discriminator": [
        227,
        110,
        155,
        23,
        136,
        126,
        172,
        25
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  117,
                  110,
                  100,
                  101,
                  114,
                  45,
                  100,
                  97,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "config.platform_auth",
                "account": "config"
              },
              {
                "kind": "account",
                "path": "config.platform_seed",
                "account": "config"
              }
            ]
          }
        },
        {
          "name": "votingState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "voting_state.project_maker",
                "account": "votingState"
              },
              {
                "kind": "account",
                "path": "voting_state.project_name",
                "account": "votingState"
              }
            ]
          }
        },
        {
          "name": "voterStakedAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "voterData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voterStakedAta"
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "voterHistory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voterData"
              },
              {
                "kind": "account",
                "path": "votingState"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "ideaFor",
          "type": "bool"
        },
        {
          "name": "strategyFor",
          "type": "bool"
        },
        {
          "name": "askFor",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "voterData",
      "discriminator": [
        188,
        23,
        235,
        160,
        38,
        227,
        251,
        114
      ]
    },
    {
      "name": "voterHistory",
      "discriminator": [
        195,
        200,
        212,
        19,
        91,
        30,
        144,
        35
      ]
    },
    {
      "name": "votingState",
      "discriminator": [
        96,
        6,
        102,
        202,
        44,
        29,
        199,
        133
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "secondUnstakingError",
      "msg": "Unstaking already started, cannot unstake twice!"
    },
    {
      "code": 6001,
      "name": "noUnstakingError",
      "msg": "Unstaking has not been started previously!"
    },
    {
      "code": 6002,
      "name": "stillUnstakingError",
      "msg": "Unstaking has not been finished yet!"
    },
    {
      "code": 6003,
      "name": "votingStillGoingError",
      "msg": "Voting still going!"
    },
    {
      "code": 6004,
      "name": "votingEndedError",
      "msg": "Voting has been ended!"
    },
    {
      "code": 6005,
      "name": "notEnoughToUnstakeError",
      "msg": "You don't have enough tokens to unstake!"
    }
  ],
  "types": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "platformAuth",
            "type": "pubkey"
          },
          {
            "name": "platformMint",
            "type": "pubkey"
          },
          {
            "name": "platformSeed",
            "type": "u64"
          },
          {
            "name": "unstakingPeriod",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voterData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "pubkey"
          },
          {
            "name": "votingPower",
            "type": "u64"
          },
          {
            "name": "isUnstaking",
            "type": "bool"
          },
          {
            "name": "unstakingEndTimestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "unstakingAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "voterStakedAtaBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voterHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ideaFor",
            "type": "u64"
          },
          {
            "name": "ideaAgainst",
            "type": "u64"
          },
          {
            "name": "strategyFor",
            "type": "u64"
          },
          {
            "name": "strategyAgainst",
            "type": "u64"
          },
          {
            "name": "askFor",
            "type": "u64"
          },
          {
            "name": "askAgainst",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "votingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "projectMaker",
            "type": "pubkey"
          },
          {
            "name": "projectName",
            "type": "string"
          },
          {
            "name": "ideaFor",
            "type": "u64"
          },
          {
            "name": "ideaAgainst",
            "type": "u64"
          },
          {
            "name": "strategyFor",
            "type": "u64"
          },
          {
            "name": "strategyAgainst",
            "type": "u64"
          },
          {
            "name": "askFor",
            "type": "u64"
          },
          {
            "name": "askAgainst",
            "type": "u64"
          },
          {
            "name": "votingStart",
            "type": "i64"
          },
          {
            "name": "votingEnd",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};
