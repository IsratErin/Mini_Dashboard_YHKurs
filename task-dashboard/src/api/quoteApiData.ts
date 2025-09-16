interface AdviceSlip {
  slip: {
    id: number;
    advice: string;
  };
}

const api_url = "https://api.adviceslip.com/advice";

const fetchDailyQuote = (): Promise<{
  quote: string;
}> => {
  return fetch(api_url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("The response from network was not ok");
      }
      return response.json();
    })
    .then((data: AdviceSlip) => {
      const todaysAdvice = data.slip;
      
      console.log(`Daily advice: ${todaysAdvice.advice}`);
      return { quote: todaysAdvice.advice };
    })
    .catch((error) => {
      console.error(
        "There has been a problem while fetching advice data:",
        error
      );
      return {
        quote:
          "When things go wrong, don’t follow them.",
      };
    });
};

export { fetchDailyQuote };
