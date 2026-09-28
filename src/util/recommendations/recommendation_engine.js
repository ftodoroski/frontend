import _ from 'lodash';


export const generateSuggestedPrograms = (targetProgram, programs) => {
    const min = 9;
    const max = 16;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;


    const suggestionsWithoutTarget = programs.filter(program => program.id != targetProgram.id)
    const shuffleSuggestions = _.shuffle(suggestionsWithoutTarget)
    const suggestedPrograms = shuffleSuggestions.slice(0, randomNum)

    return suggestedPrograms
}






