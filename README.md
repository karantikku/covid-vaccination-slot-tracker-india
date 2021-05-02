# cowid-vaccination-slot-tracker-india
Service to track COVID-19 vaccine availability in India and sending notifications using SMS via Twilio messaging API (Trial Account).

# Requirements
- Node 14

# Usage

This service fetches the latest Covid Vaccinations Sessions data from [Cowin API](https://apisetu.gov.in/public/api/cowin) and sends it to the provided phone number provided via an SMS (Twilio messaging API).

## Setup
1. Clone the repository
```
git clone https://github.com/karantikku/covid-vaccination-slot-tracker-india.git
```
2. Install 
```
npm install
```

3. Setup Twilio API Access (Trial Account)
References: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account

4. Create `.env` file and setup ENV Vars.

| Name   |      Description      |  Remarks |
|:---------|:-------------:|:-----|
| TWILIO_ACCOUNT_SID |  TWILIO ACCOUNT SID (Available in Twilio Dashboard) | |
|TWILIO_AUTH_TOKEN |    TWILIO AUTH TOKEN  (Available in Twilio Dashboard)   |   |
|RECIPIENT_PHONE_NUMBER | Personal mobile number used for verificiation while creating an account with Twilio |    When you signed up for your trial account, you verified your personal phone number. You can see your list of verified phone numbers on the Verified Caller IDs page. You must verify any non-Twilio phone numbers you wish to send SMS messages or MMS messages, or place phone calls to while in trial mode. This is an extra security measure for trial accounts that we remove once you upgrade your account. You may verify as many phone numbers as you like. |
| FROM_PHONE_NUMBER | Twilio phone number — a phone number purchased through Twilio — to send messages or make phone calls using Twilio. | https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number |
| REFRESH_WINDOW | Specifies rate at which tracker quries COWIN API  |    Rate in **minutes**. Please do not abuse this API endpoint as it is very critical. Avoid sending requests to the API Endpoint every few minutes. Ideally, set it as 60 minutes. |
| PINCODE | Area Pincode |    |
| AGE | Age of the beneficiary  |   |

# Important
1. Please do not abuse COWIN API endpoints as it is very critical. Avoid sending requests to the API Endpoint every few minutes. 
2. Be mindful of the Twilio SMS API usage and keep tracking the API Usage costs.

# Contributing

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

