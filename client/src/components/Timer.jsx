import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Timer({timeLeft,totalTime}) {
    const percentage=(timeLeft/totalTime)*100;
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar value={percentage} text={`${timeLeft}%`} 
        styles={buildStyles({
            textSize:"28px",
            pathColor: "#000000",
            textColor: "#ffffff",
            trailColor: "#ff34aa"
        })
        }
        />
    </div>
  )
}

export default Timer