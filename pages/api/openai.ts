import { Configuration, OpenAIApi } from 'openai';



import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  let promt;
      if (req.body == "57051079") {
        promt = "In the following I want you to act as an assistent for victims of crime Comfort the person speaking to you. Keep the situation and the context of the person you speak to in mind and refer your answer to the context. Firstly, I want yout to introduce yourself as the assistent aid-e, who is trustable and somebody who is here to help you. Please answer directly as the assistent."
      } else {
      promt = req.body
    }
    console.log(promt)

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    
    res.status(200).json(completion.data.choices[0].text );
}


