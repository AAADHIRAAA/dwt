# sok_agent_stats
Scribe Agent Stat Manager

#To run  

STEPS
1) cd books_tracker --> npm install
2) cd backend ---> npm install and cd client --> npm install
3) Create a .env.example file and add the followings and mongodb connection string in backend folder
4) books_tracker --> npm run dev

#.env.example file in backend

SESSION_SECRET='314049d8-9766-4a81-a909-b9b57f62151b'

COOKIE_KEY='314049d8-9766-4a81-a909-b9b57f62151b'

JWT_SECRET='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5OTM2Nzk2NywiaWF0IjoxNjk5MzY3OTY3fQ.YIHXvHC8h2o_0R5gArBqa9IEeCXg6LB3LVw7_6nAcTU'

GOOGLE_CLIENT_ID='748937670568-frbnlsakh74gn6j12rhosirkriok3rmi.apps.googleusercontent.com'

GOOGLE_CLIENT_SECRET='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'

#.env.local in client

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2hhcnAtYnVsbGZyb2ctNTAuY2xlcmsuYWNjb3VudHMuZGV2JA

CLERK_SECRET_KEY=sk_test_s9UqwtICrgZVlBUhaRsByhm2AUzzfEN8Izga1aAuEZ
