const url = window.location.href

const quizBox = document.getElementById('quiz-Box')

const ScoreBox = document.getElementById('ScoreBox')
const ResultBox = document.getElementById('ResultBox')

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function (response) {
        // console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)) {
                quizBox.innerHTML += `
                    <hr>
                    <div class="questions">
                        <b>${question}</b>
                    </div>
                `
                answers.forEach(answer => {
                    quizBox.innerHTML += `
                        <div class="answers-class">
                        
                            <label for="${question}">${answer}</label>
                            <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value = "${answer}">
                           
                        </div>

                    `
                })
            }
        });
    },
    error: function (error) {
        console.log(error)
    }
})

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el => {
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function (response) {
            // console.log(response)

            const results = response.results
            console.log(results)
            quizForm.classList.add('not-visible')

            ScoreBox.innerHTML = `${response.passed ? 'Congratulations! ' : 'Ups..:('}Your result is : ${response.score.toFixed(2)}% `
            results.forEach(res => {
                const resDiv = document.createElement("div")



                for (const [question, resp] of Object.entries(res)) {
                    // console.log(question)
                    // console.log(resp)
                    // console.log('*******')

                    resDiv.innerHTML += question
                    const cls = ['answers-result']
                    resDiv.classList.add(...cls)

                    if (resp == 'not answered') {
                        resDiv.innerHTML += '- not answerd'
                        resDiv.classList.add('bg-ns')
                        resDiv.style.color = 'black';
                    }
                    else {
                        const answer = resp['answered']
                        const correct = resp['correct_answer']

                        if (answer == correct) {
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += `answered: ${answer}`
                        } else {
                            resDiv.classList.add('bg-denger')
                            resDiv.innerHTML += ` | correct answer: ${correct}`
                            resDiv.innerHTML += ` | answered: ${answer}`
                        }
                    }
                }
                // const body = document.getElementsByTagName('body')[0]
                ResultBox.append(resDiv)


            })
        },
        error: function (error) {
            console.log(error)
        }
    })
}

quizForm.addEventListener('submit', e => {
    e.preventDefault()

    sendData()
})