function generateUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c==='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
};

const familyData = [
  {
    "id": generateUUID(),
    "first_name": "Alice",
    "last_name": "Adams",
    "devices": [
      {
        "id": generateUUID(),
        "device_type": "iPhone 7"
      },
      {
        "id": generateUUID(),
        "device_type": "Samsung Galaxy"
      }
    ]
  },
  {
    "id": generateUUID(),
    "first_name": "Bob",
    "last_name": "Adams",
    "devices": [
      {
        "id": generateUUID(),
        "device_type": "iPhone XR"
      }
    ]
  },
  {
    "id": generateUUID(),
    "first_name": "Chris",
    "last_name": "Adams",
    "devices": [
      {
        "id": generateUUID(),
        "device_type": "iPhone 8"
      }
    ]
  },
  {
    "id": generateUUID(),
    "first_name": "Dorothy",
    "last_name": "Adams",
    "devices": [
      {
        "id": generateUUID(),
        "device_type": "HTC 10"
      },
      {
        "id": generateUUID(),
        "device_type": "Pixel 3 XL"
      }
    ]
  }
];

const alertData = [
  {
    "id": generateUUID(),
    "timestamp": Date.now(),
    "detail": "Chris used an unmonitored web browser: Brave",
    "familyMember": "Chris",
    "device": "iPhone 8",
    "type": "alert"
  },
  {
    "id": generateUUID(),
    "timestamp": Date.now(),
    "detail": "Location Services have been turned off on this device.",
    "familyMember": "Chris",
    "device": "iPhone 8",
    "type": "action"
  },
  {
    "id": generateUUID(),
    "timestamp": Date.now(),
    "detail": "Dorothy was blocked from visiting a website from the Blocked Category list: www.youtube.com",
    "familyMember": "Dorothy",
    "device": "iPhone 8",
    "type": "alert"
  }
];

const deviceThreatData = [
  {
    "device_id": generateUUID(),
    "familyMember": "Alice",
    "webThreats": [
      {
        "id": generateUUID(),
        "category": "Phishing",
        "count": 5
      },
      {
        "id": generateUUID(),
        "category": "Technology",
        "count": 3
      },
      {
        "id": generateUUID(),
        "category": "Malicious",
        "count": 2
      },
      {
        "id": generateUUID(),
        "category": "Social",
        "count": 2
      }
    ],
    "appThreats": [
      {
        "id": generateUUID(),
        "name": "EICAR",
        "type": "Spyware"
      },
      {
        "id": generateUUID(),
        "name": "Twitter",
        "type": "Blocked Application"
      }
    ],
    "locationThreats": [
      {
        "id": generateUUID(),
        "type": "Location Disabled",
        "description": "Location Services have been disabled for this device."
      },
      {
        "id": generateUUID(),
        "type": "Theft Alert",
        "description": "Activity on this device indicates that it may have been stolen.",
        "location": {
          "lat": 37.7749,
          "long": 122.4194
        }
      }
    ]
  },
  {
    "device_id": generateUUID(),
    "familyMember": "Bob",
    "webThreats": [
      {
        "id": generateUUID(),
        "category": "Sports",
        "count": 5
      },
      {
        "id": generateUUID(),
        "category": "Technology",
        "count": 4
      },
      {
        "id": generateUUID(),
        "category": "Malicious",
        "count": 4
      },
      {
        "id": generateUUID(),
        "category": "Social",
        "count": 2
      }
    ]
  }
];

const countFamily = (data) => {
  let counter = 0;
  data.forEach((employee) => {
    counter++;
  });
  return counter;
};

const countDevices = (data) => {
  let counter = 0;
  data.forEach((employee) => {
    let count = employee.devices.length
    counter += count;
  });
  return counter;
}

export {
  alertData,
  familyData,
  deviceThreatData,
  countFamily,
  countDevices
};
