export type SolanaPrograms = {
  "version": "0.1.0",
  "name": "solana_programs",
  "instructions": [
    {
      "name": "createPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "posX",
          "type": "u8"
        },
        {
          "name": "posY",
          "type": "u8"
        },
        {
          "name": "initColR",
          "type": "u8"
        },
        {
          "name": "initColG",
          "type": "u8"
        },
        {
          "name": "initColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newColR",
          "type": "u8"
        },
        {
          "name": "newColG",
          "type": "u8"
        },
        {
          "name": "newColB",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "posX",
            "type": "u8"
          },
          {
            "name": "posY",
            "type": "u8"
          },
          {
            "name": "colR",
            "type": "u8"
          },
          {
            "name": "colG",
            "type": "u8"
          },
          {
            "name": "colB",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PixelChanged",
      "fields": [
        {
          "name": "posX",
          "type": "u8",
          "index": false
        },
        {
          "name": "posY",
          "type": "u8",
          "index": false
        },
        {
          "name": "colR",
          "type": "u8",
          "index": false
        },
        {
          "name": "colG",
          "type": "u8",
          "index": false
        },
        {
          "name": "colB",
          "type": "u8",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidXCoordinate",
      "msg": "the given X co-ordinate is not between 0-99"
    },
    {
      "code": 6001,
      "name": "InvalidYCoordinate",
      "msg": "the given Y co-ordinate is not between 0-99"
    },
    {
      "code": 6002,
      "name": "InvalidRColor",
      "msg": "the given R color is not between 0-255"
    },
    {
      "code": 6003,
      "name": "InvalidGColor",
      "msg": "the given R color is not between 0-255"
    },
    {
      "code": 6004,
      "name": "InvalidBColor",
      "msg": "the given R color is not between 0-255"
    }
  ]
};

export const IDL: SolanaPrograms = {
  "version": "0.1.0",
  "name": "solana_programs",
  "instructions": [
    {
      "name": "createPixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "posX",
          "type": "u8"
        },
        {
          "name": "posY",
          "type": "u8"
        },
        {
          "name": "initColR",
          "type": "u8"
        },
        {
          "name": "initColG",
          "type": "u8"
        },
        {
          "name": "initColB",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePixel",
      "accounts": [
        {
          "name": "pixel",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newColR",
          "type": "u8"
        },
        {
          "name": "newColG",
          "type": "u8"
        },
        {
          "name": "newColB",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pixel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "posX",
            "type": "u8"
          },
          {
            "name": "posY",
            "type": "u8"
          },
          {
            "name": "colR",
            "type": "u8"
          },
          {
            "name": "colG",
            "type": "u8"
          },
          {
            "name": "colB",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PixelChanged",
      "fields": [
        {
          "name": "posX",
          "type": "u8",
          "index": false
        },
        {
          "name": "posY",
          "type": "u8",
          "index": false
        },
        {
          "name": "colR",
          "type": "u8",
          "index": false
        },
        {
          "name": "colG",
          "type": "u8",
          "index": false
        },
        {
          "name": "colB",
          "type": "u8",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidXCoordinate",
      "msg": "the given X co-ordinate is not between 0-99"
    },
    {
      "code": 6001,
      "name": "InvalidYCoordinate",
      "msg": "the given Y co-ordinate is not between 0-99"
    },
    {
      "code": 6002,
      "name": "InvalidRColor",
      "msg": "the given R color is not between 0-255"
    },
    {
      "code": 6003,
      "name": "InvalidGColor",
      "msg": "the given R color is not between 0-255"
    },
    {
      "code": 6004,
      "name": "InvalidBColor",
      "msg": "the given R color is not between 0-255"
    }
  ]
};
