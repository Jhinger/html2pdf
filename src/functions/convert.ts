export const handler = async (event: any) => {
  console.log("Event from converter: \n", event);
  return {
    statusCode: 200,
  };
};
