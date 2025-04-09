# v1

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


### Testing using Postman

**POST Requests**

1) Adding New Team
http://localhost:8080/api/team
raw JSON sample
```
{
  "teamName": "Chennai Super Kings",
  "teamID": "CSK001",
  "teamImage": "https://example.com/images/csk.png",
  "teamBalance": 7500000,
  "teamRating": 83,
  "numberofPlayers": 0,
  "player_bought": 0,
  "number_foreign": 0,
  "colorCode": "#FFFF00",
  "basePrice": 100000
}
```

2) Adding new Player
http://localhost:8080/api/player
raw JSON sample
```
{
  "playerName": "Virat Kohli",
  "playerId": "VK0  01",
  "rating": 90,
  "boughtAt": null,
  "basePrice": 200000,
  "pool": "Batsman",
  "nationality": "Indian",
  "role": "Captain"
}
```

3) Selling a player 
http://localhost:8080/api/sell-player
raw JSON sample
```
{
  "soldTo": "Mumbai Indians",
  "playerName": "Rohit Sharma",
  "playerId": "RS001",
  "price": 450000,
  "transactionId": 1234567890
}
```

4) Adding Logs Manually
Logs are added automatically after operations, can also be added manually
raw JSON sample
```
{
  "soldTo": "Mumbai Indians",
  "playerName": "Rohit Sharma",
  "playerId": "RS001",
  "price": 450000,
  "transactionId": 1234567890
}
```


**GET Requests**
<br>
Navigate to:
- http://localhost:8080/api/teams - To get all teams
- http://localhost:8080/api/players - To get all players
- http://localhost:8080/api/sold-players - To get all sold players
- http://localhost:8080/api/logs - To get all transaction logs


**Patch Requests** -> are through post requests
<br>
use post method
/api/team/:teamID
```/api/team```
```
{
  "teamID:  "MI001",
  "teamName": "Mumbai Indians 2025",
  "teamImage": "https://example.com/mi-logo-updated.png",
  "numberofPlayers": 27
}
```
/api/player/:playerId
```/api/player```
```
{
  "playerID":"VK001",
  "rating": 95,
  "basePrice": 250000,
  "pool": "Batsman-Captain"
}
```