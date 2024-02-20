import { useState } from "react";
import AxiosInstance from "./Axios";
import { ImCross } from "react-icons/im";
import { LuInfo } from "react-icons/lu";

const Home = () => {
  const buttonColors = ['#FF5733', '#33FF57', '#5733FF', '#FF3385', '#33B8FF'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infomodal,setInfoModal] = useState(false);

  const [formData, setFormData] = useState({
    currentbudget: 0,
    targetbudget: 0,
    options: "",
  });

  const [simulationResults, setSimulationResults] = useState(null);

  const onChangeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(`budgetc/`, formData);
      setSimulationResults(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  const closeInfoModal = () => {
    setInfoModal(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const info = () => {
    setInfoModal(!infomodal); // Toggle the state between true and false
  };
  

  return (
    <div className="container" style={{ borderRadius: '1rem' }}>
      <div className="text">Lucky Budget Planner</div>
      <form onSubmit={formSubmissionHandler}>
        <div className="form-row">
          <div className="input-data">
            <input type="number" name="currentbudget" onChange={onChangeHandler} inputMode="numeric" required />
            <div className="underline"></div>
            <label htmlFor="">Current Capital <span style={{color:'green',fontSize:'small'}}>*</span></label>
          </div>
          <div className="input-data">
            <input type="number" name="targetbudget" onChange={onChangeHandler} inputMode="numeric" />
            <div className="underline"></div>
            <label htmlFor="">Target Capital<span style={{color:'green',fontSize:'small'}}>(optional)</span></label>
          </div>
        </div>

        <div className="form-row options" style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="input-data textarea button-group" style={{ width: "80%", display: 'flex', justifyContent: 'space-evenly' }}>
            {["4 levels", "4 levels + 1", "5 levels", "5 levels + 1", "6 levels"].map((option, index) => (
              <button
                key={index}
                type="button"
                className={`option-button ${formData.options === option ? 'selected' : ''}`}
                style={{
                  width: '100%',
                  height: '3rem',
                  borderRadius: '1rem',
                  backgroundColor: buttonColors[index],
                  opacity: formData.options === option ? 1 : 0.6,
                  scale: formData.options === option ? 1.06 : 1,
                  boxShadow:formData.options === option ?'0px 1px 4px gray':"none" ,
                }}
                onClick={() => onChangeHandler({ target: { name: 'options', value: option } })}
              >
                <h4 style={{ color: 'white' }}>{option}</h4>
              </button>
            ))}
            <LuInfo style={{
              color:"red",
              width:'30%',
              height:'30%'
            }}
            onClick={info}/>
          </div>
        </div>

        <div className="form-row submit-btn" style={{ width: '100%', justifyContent: 'center' }}>
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="submit" />
          </div>
        </div>
      </form>
      {infomodal &&(
        <div className="modal">
                  <div className="modal-content" style={{
                    width:"60%"
                  }}>
                    <h4 className="Kaka">Instructions</h4>
                    <div className="buttons" style={{
                      display:"flex",justifyContent:"end"
                    }}>
                    
                    <ImCross onClick={closeInfoModal}/>
                    </div>
                    
                    <div className="section">
                    <h4>Option 4 level :</h4>
                    <p>This means that your budget will be divided into four levels. Each level may represent a different stage or aspect of your budget allocation. The simulation will consider these four levels to generate results.</p>
                
                    <h4>Option 4 level + 1:</h4>
                    <p>This option is considered for five levels in total. Out of these five levels, the first four levels are designated for 100% profit. The fifth level, represented by the "<code>+1</code>," is intended to account for the remaining amount that will be used to reach the initial bet amount. Essentially, it allows for additional flexibility in how the remaining budget is utilized, introducing a fifth level with a different purpose.</p>
                
                    <h4>Option 5 level :</h4>
                    <p>This means that your budget will be divided into five levels. Each level represents a different stage or aspect of your budget allocation. The simulation will consider these five levels to generate results.</p>
                
                    <h4>Option 5 level + 1:</h4>
                    <p>This option is considered for six levels in total. Out of these six levels, the first five levels are designated for 100% profit. The fifth level, represented by the "<code>+1</code>," is intended to account for the remaining amount that will be used to reach the initial bet amount. Essentially, it allows for additional flexibility in how the remaining budget is utilized, introducing a sixth level with a different purpose.</p>
                
                    <h4>Option 6 level :</h4>
                    <p>This means that your budget will be divided into six levels. Each level represents a different stage or aspect of your budget allocation. The simulation will consider these six levels to generate results.</p>
                
                    </div>
                  </div>
                </div>
      )

      }

      {simulationResults && (
        <div className="result-container">
          {formData.targetbudget ? (
            <div>
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <h4 className="Kaka">Simulation Results</h4>
                    <div className="buttons" style={{
                      display:"flex",justifyContent:"end"
                    }}>
                    
                    <ImCross onClick={closeModal}/>
                    </div>
                    
                    <table className="result-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Initial Bet Amount</th>
                          <th>2% Bet Profit</th>
                          <th>Total Amount on Day</th>
                        </tr>
                      </thead>
                      <tbody>
                        {simulationResults.map((result, index) => (
                          <tr key={index}>
                            <td>{result.Date}</td>
                            <td>{result.Initial_bet_amount}</td>
                            <td>{parseFloat(result["2_percent_bet_profit"]).toFixed(3)}</td>
                            <td>{parseFloat(result["Total_amount_on_day"]).toFixed(3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="result-details">
              <h4>Simulation Details</h4>
              <div>
                <p className="paras">Date:<span className="amounts"> {simulationResults[0].Date}</span></p>
                <p className="paras">Initial Bet Amount: <span className="amounts">{simulationResults[0].Initial_bet_amount}</span></p>
                <p className="paras">2% Bet Profit:<span className="amounts"> {parseFloat(simulationResults[0]['2_percent_bet_profit']).toFixed(3)}</span></p>
                <p className="paras">Total Amount on Day: <span className="amounts">{parseFloat(simulationResults[0]['Total_amount_on_day']).toFixed(3)}</span></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
