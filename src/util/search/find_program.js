const findProgram = (showcase_id, programs) => {
    return programs.find((program) => showcase_id === program.id)
}

export default findProgram