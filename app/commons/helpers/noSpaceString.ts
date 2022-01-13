const noSpaceString = (someStr = ''): string => {
  return someStr.split(' ').join('').toLocaleLowerCase();
};

export default noSpaceString;
