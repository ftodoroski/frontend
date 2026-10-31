const findProgram = (program_id, programs) => {
    return programs.find((program) => program_id === program.id)
}

export default findProgram