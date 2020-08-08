const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Fagner Lima",
        avatar: "https://avatars2.githubusercontent.com/u/67914607?s=460&u=1401c4eaf76020db88923775928056ef04965012&v=4",
        whatsapp: "21995251234",
        bio: "Entusiasta das melhores tecnologias no mundo da programação. <br><br> Apaixonado pelo mundo tecnológico. O futuro esta logo aí batendo na porta.",
    }

    classValue = {
        subject: "1",
        cost: "100",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // classid virá pelo banco de dados, após cadastrar a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    //console.log(selectClassesSchedules)

})