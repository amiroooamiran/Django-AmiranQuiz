// the scripts for Quiz Partin

const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalbody = document.getElementById('confarmation')
const btnstart = document.getElementById('btnstart')

const quizcard = document.getElementById('section-quiz')


modalBtns.forEach(modalBtn => modalBtn.addEventListener('click', () => {
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestion = modalBtn.getAttribute('data-questions')
    const difficulty = modalBtn.getAttribute('data-dificluty')
    const scoreTopass = modalBtn.getAttribute('data-pass')
    const time = modalBtn.getAttribute('data-time')

    quizcard.style.display = 'block';

    modalbody.innerHTML = `
        <div class="informationList">
            <h3>Are you sure to begin <b>${name}</b> ?</h3>
            <div class="text-muted">
               <ul>
                   <Strong>
                        <li>Difficulty : <b>${difficulty}</b></li>
                        <br>
                        <li>number of questions : <b>${numQuestion}</b></li>
                        <br>
                        <li>score to pass : <b>${scoreTopass}%</b></li>
                        <br>
                        <li>Time : <b>${time}</b> min</li>
                   <strong>
               </ul>
            <div>
            
        </div>
    `
    url = window.location.href

    btnstart.addEventListener('click', () =>{
        window.open(url + pk)
    })

}))

function closesection(){
    quizcard.style.display = 'none'
}