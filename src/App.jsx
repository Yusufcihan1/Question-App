import { useEffect, useState } from 'react'
import './App.css'
import { data } from './data'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
 
   
   const [index , setIndex] = useState(0);
   const [question , setQuestion ] = useState('');
   const [answer , setAnswer ] = useState('');
   const [options , setOptions] = useState([]);
   const [media , setMedia] = useState([]);
   const [result , setResult] = useState([]) 
   const [resultQuestion , setResultQuestion] = useState(false)
   const [currentQuestion] = useState(0);
   const [timer, setTimer] = useState(30);   
   const [keywords ,setKeywords] = useState([])
   const [correct, setCorrect ] = useState(0);
   const [wrong , setWrong ] = useState(0);
   const [questionNumber , setQuestionNumber] = useState(1);
   const [startPage , setStartPage ] = useState(false)
   const [ilber , setIlber ] = useState('');

   

const handleClick = (e)=>{
  const selectedOption = e.target.value 
  console.log(selectedOption)
  if(answer === selectedOption ){
    const truer = 'Doğru'
    result.push(truer)
    setResult([...result])
    setCorrect((prev)=>prev + 1)
    setIndex(index + 1)
    setQuestionNumber((prev)=>prev + 1)
    setTimer(30)
    keywords.push(selectedOption)
    setKeywords([...keywords])
  
    
    
   
    
    
  }else{
    const falser = 'Yanlış'
    result.push(falser)
    setResult([...result])
    setIndex(index + 1)
    setTimer(30)
    setQuestionNumber((prev)=>prev + 1)
    setWrong((prev)=> prev + 1 )
    keywords.push(selectedOption)
    setKeywords([...keywords])
   
    
    
    
  }
 
  
}

useEffect(()=>{
    setAnswer("");
    
  if (typeof data[index] !== "undefined"){
    
    setAnswer(data[index].answer);
    setQuestion(data[index].question);
    setMedia(data[index].media);
    setOptions(data[index].options)
 

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        
        setIndex(index + 1)
        setTimer(30)
        setQuestionNumber((prev)=>prev + 1)
        
      }
    }, 1000);

      if (timer === 0 || timer === 30 ){
        setResultQuestion(false)
      }else if( timer <= 20){
        setResultQuestion(true)
      }
    
  
  
    
    return () =>{
      clearInterval(interval);
      
    }
       
    
    
  }
},[index,timer, currentQuestion, startPage])
 

const continuePage = ()=>{
  setStartPage(true)
  setTimer(30)
}

const refreshPage = () => {
  window.location.reload();
};

useEffect(()=>{
if(correct >= 7){
 setIlber('Bildiğim Tek Şey Var O Da Her Şeyi Bildiğimdir') 
}else if (correct >= 4  && correct < 7 ){
  setIlber('Bu soruları ilkokul çocukları bilir') 
}else if (correct < 4){
  setIlber('Görüyorum ki aramıza yeni cahiller katılmış')
}
},[correct])



  return (
    <>
    <div>
      {startPage === false &&
      <div className='app'>
        <div className='start-page'>
        <div className='start-page-body'>
        <div>
          <img className='start-image' src="https://t4.ftcdn.net/jpg/02/87/36/23/360_F_287362356_P2aOUyD53mZHwDFIIOzBAagiaQTgl6q0.jpg" alt="" />
        </div>
        <div>
          <h2 style={{ marginBottom:'40px', fontFamily:'cursive', color:'#009688'} }>Quiz Time'a Hoşgeldiniz</h2>
          <h4 style={{ marginBottom:'40px', fontFamily:'cursive' , fontSize:'20px'} } >Test Kuralları </h4>
          </div>
          <div >
            <ul className='rules-list'>
              <li>Test 10 sorudan oluşmaktadır</li>
              <li>Her soru ekranda en fazla 30sn kalacaktır.</li>
              <li>İlk 10sn cevap şıkları görünmeyecektir.</li>
              <li>Cevap şıklarından biri tıklandıktan ya da 30sn tamamlandıktan sonra yeni soruya geçilecektir.</li>
              <li>Geçmiş sorulara dönülemeyecektir.</li>
              <li>Test bitiminde her soruya verilen yanıt ile doğru ve yanlış sayıları kullanıcı ile paylaşılacaktır.</li>
            </ul>
          </div>
        <div>
          <button id='start' className='start' onClick={continuePage}>Teste Başla</button>
        </div>
        </div>
        </div>
      </div>
      }{
        startPage === true &&
      
    <div>
    {answer !== '' && 
    <div className='fragment'>
     <div className='app'>
        <div className='header-content'>
      <div className='question-number'>
        Soru : {questionNumber}
      </div>
      <div className='countdown' >
        <CircularProgressbar value={timer} maxValue={30} text={`${timer}`} />
        </div>
      </div>
      <div>
      <img className='image' src={media} alt="" />
      </div>
      <div className='question-header'>
        <span className='text'>{question}</span>
      </div>
       <div>
        {
          resultQuestion ? <div className='options-head'>
          {
            options.map((item,index)=>(
              <button className='options-btn' value={item} onClick={handleClick} key={index}>{item}</button>
            ))
          }
          </div> : null
        }
       </div>
     </div>
     
     </div>
      }
      {answer === "" &&
      <div className='end-page-background'>
        <div className='end-page'>
          <div className='end-page-li'>
          <h2>Test Bitti</h2>
          <span style={{fontFamily:'cursive' , color:'white'}}>Doğru Sayısı : {correct} </span>
          <br />
          <span style={{fontFamily:'cursive' , color:'white'}}>Yanlış Sayısı : {wrong}</span>
          <br />
          <span style={{fontFamily:'cursive' , color:'white'}}>Puanınız :  {correct*10} </span>
          </div>
          <div className='ilber-header'>
            <img className='ilber' src='https://cdnuploads.aa.com.tr/uploads/Contents/2022/06/19/thumbs_b_c_a2b050cf501efa8083ca1f06571f9fb8.jpg?v=224052' alt="" />
            <div className='ilber-text'>
              <h3>İlber Hoca'nın Yorumu</h3>
              <p id='paragraf'>{ilber}</p>
            </div>
          </div>
          <div style={{marginTop:'1rem'}}>
          <h2>Cevaplarınız :</h2>
          </div>
          <div className='results'>
          <div className='keywords-settings' >
            {
              keywords.map((item,index)=>(
                <li className='keywords-li' key={index}> {item} </li>
              ))
            }
          </div>
          <div className='results-settings'>
          {
              result.map((item , index)=>(
                <span className='result-li' key={index}>=>   {item}</span>
              ))
            }
          </div>
        </div>
        <div>
          <button className='finish-btn' onClick={refreshPage}>Testi Tekrar Çöz</button>
        </div>
        </div>
        </div>
      }
     </div>
     }
     </div>
    </>
  )
}

export default App
