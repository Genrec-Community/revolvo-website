from openai import OpenAI
client = OpenAI(
  api_key="55c44074-d0ae-436b-a5eb-1ed1234a9f99",
  base_url="https://api.kluster.ai/v1"
)

completion = client.chat.completions.create(
   model = "klusterai/Meta-Llama-3.3-70B-Instruct-Turbo",
   max_completion_tokens = 5000,
   temperature = 1,
   top_p = 1,
   messages = [
        {"role": "user", "content": "hi"}
   ]
)