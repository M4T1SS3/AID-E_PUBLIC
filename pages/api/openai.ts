import { Configuration, OpenAIApi } from 'openai';



import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  let promt;
  let first3 = req.body.slice(0, 3);
  promt = "In the following I want you to act as an assistent called aid-e for victims of crime.   Comfort the person speaking to you, provide steps the victim can take next. Keep the situation and the context of the person you speak to in mind and refer your answer to the context. Answer in the language refered to you. Please answer directly as the assistent aid-e."
  //add strafgesetzt

  if (first3 == "*!&") {
   promt = promt + "this is the coversation history: " + req.body +  " Please provide the victim with a legal analysis based on the history where every violation is presented in the following format. Dont add other information that does not fit the asked format. Always use the following format, dont use numbers, labels for the input and input only where it is marked with ** (remove the ** when genereting the suggestions). Add at least 4 analyzed violations in this format to a list. This is the Format: violation: *here should be the name of the violoation of the law. Description: *here should be the description of the violation of the law*. Link: *here should be a link to further information about the crime*. "

  } else if (first3 == "ö§-") {
    promt = promt + "this is the coversation history as a dialogue: " + req.body + " Please provide the victim with at least 4 general things the victim can do now to improve her situation. Be specific and refer the advice to the individual generation of the victim. Always use the following format, dont use numbers, labels for the input and input the text where it is marked with ** (remove the ** when genereting the suggestions). Add multiple suggestions in this format to a list. This is the format: headline *here should be the headline of the advice*. Description: *Here should be the description of the advice with detailed instructions and positive words*."
  }else {
    promt = promt + "this is the coversation history. " + req.body + " please provide an answer to the last message from [victim]: " 
  }
    

    console.log(promt)

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promt,
      temperature: 0.6,
      max_tokens: 2050,
    });
    res.status(200).json(completion.data.choices[0].text );
}


