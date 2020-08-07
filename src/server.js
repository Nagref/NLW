//Dados
const proffys = [
    {
        name: "Fagner Lima",
        avatar: "https://avatars2.githubusercontent.com/u/67914607?s=460&u=1401c4eaf76020db88923775928056ef04965012&v=4",
        whatsapp: "21995251234",
        bio: "Entusiasta das melhores tecnologias no mundo da programação. <br><br> Apaixonado pelo mundo tecnológico. O futuro esta logo aí batendo na porta.",
        subject: "Tecnologia",
        cost: "100",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "21900550055",
        bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas emlaboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
//Funcionalidade
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]

}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    //se tiver dados (data)
    const isNotEmpry = Object.keys(data).length > 0
    if (isNotEmpry) {

        data.subject = getSubject(data.subject)

        //Adicionar data a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    // Se não,mostrar a página

    return res.render("give-classes.html", { subjects, weekdays })
}
//Servidor
const express = require('express')
const server = express()


//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
//Início e configuração do servidor
server
    //configurar arquivos estáticos (css, scripts, imagens)
    .use(express.static("public"))
    //rotas da aplicaçao
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    //start do servidor
    .listen(5500)