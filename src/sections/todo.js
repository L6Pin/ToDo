import videoBg from "../img/videoBg.mp4";
import mainBtn from '../img/mainBtn.png';
import logo from '../img/logo.png';
import addBtn from '../img/addBtn.png';
import editBtn from '../img/editBtn.png';
import completeBtnField from '../img/completeBtnField.png';
import deleteBtnField from '../img/deleteBtnField.png'
import editBtnField from '../img/editBtnField.png'
import activeMissions from '../img/activeMissions.png'
import React, { Component } from 'react';


class todo extends Component {
    constructor() {
        super()
        this.state = {
            true: true,
            false: false,
            newMissionOpened: false,
            editMissionOpened: false,
            missions: []
        }
    }

    componentDidMount() {


        //   Code for adding time in the header 
        // ----------------------------------------
        let getDay = () => {
            let currentDay = new Date().getDay();
            let day;
            switch (currentDay) {
                case 0:
                    day = "SUNDAY";
                    return day;
                case 1:
                    day = "MONDAY";
                    return day;
                case 2:
                    day = "TUESDAY";
                    return day;
                case 3:
                    day = "WEDNESDAY";
                    return day;
                case 4:
                    day = "THURSDAY";
                    return day;
                case 5:
                    day = "FRIDAY";
                    return day;
                case 6:
                    day = "SATURDAY";
                    return day;
            }
        }

        let getTime = () => {
            let time = new Date();
            let h = time.getHours();
            let m = time.getMinutes();
            let s = time.getSeconds();

            if (s < 10)
                s = "0" + s;

            if (m < 10)
                m = "0" + m;

            if (h < 10)
                h = "0" + h;

            document.querySelector('.time').innerHTML = h + ":" + m + ":" + s;
        }

        let getTextMonth = (month) => {
            let textMonth = "";
            switch (month) {
                case 0:
                    textMonth = "January"
                    return textMonth;
                case 1:
                    textMonth = "February"
                    return textMonth;
                case 2:
                    textMonth = "March"
                    return textMonth;
                case 3:
                    textMonth = "April"
                    return textMonth;
                case 4:
                    textMonth = "May"
                    return textMonth;
                case 5:
                    textMonth = "June"
                    return textMonth;
                case 6:
                    textMonth = "July"
                    return textMonth;
                case 7:
                    textMonth = "August"
                    return textMonth;
                case 8:
                    textMonth = "September"
                    return textMonth;
                case 9:
                    textMonth = "October"
                    return textMonth;
                case 10:
                    textMonth = "November"
                    return textMonth;
                case 11:
                    textMonth = "December"
                    return textMonth;
            }
        }

        let getDate = () => {
            let time = new Date();
            let dayNum = time.getDay() + 1;
            let month = time.getMonth();
            let year = time.getFullYear();
            document.querySelector('.date').innerHTML = dayNum + "‎‎‎‎‎‎‎ " + getTextMonth(month) + " " + year;
        }

        let appTime = () => {
            document.querySelector('.day').innerHTML = getDay()
            getTime()
            getDate()
        }

        setInterval(appTime, 1000);
        //    ---------------------------------------------

        if (localStorage.getItem('msn')) {
            this.setState({
                missions: JSON.parse(localStorage.getItem('msn'))
            })
        }
    }

    render() {

        let countCompletedMissions = () => {

            let totalCompletedMissions = 0;

            for (let i = 0; i < this.state.missions.length; i++) {
                if (this.state.missions[i].isDone === false) {
                    totalCompletedMissions++
                }
            }

            return totalCompletedMissions

        }

        let NewMissionWindow = () => {
            this.setState({ newMissionOpened: !this.state.newMissionOpened })
        }

        let editMissionOpened = () => {
            this.setState({ editMissionOpened: !this.state.editMissionOpened })
        }

        let openEditWindow = (e) => {
            // editMissionOpened()

            console.log(e)

            let missionProperties = e.target.parentElement.parentElement.parentElement.childNodes;

            let missionTitle = missionProperties[0].innerHTML
            let missionText = missionProperties[1].innerHTML

            document.querySelector('#missionTitleEdit').value = missionTitle;
            document.querySelector('#missionTextEdit').value = missionText;

            this.setState({
                editMissionOpened: !this.state.editMissionOpened
            })

            localStorage.setItem('missionIndexEdit', e.target.parentElement.parentElement.parentElement.id.toString())

        }

        let changeToEditedText = () => {
            let newMissionTitle = document.querySelector('#missionTitleEdit').value;
            let newMissionText = document.querySelector('#missionTextEdit').value;

            let tempArray = this.state.missions

            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].mId.toString() === localStorage.getItem('missionIndexEdit')) {
                    tempArray[i].title = newMissionTitle
                    tempArray[i].text = newMissionText
                }
            }

            this.setState({
                mission: tempArray
            })

            localStorage.setItem('msn', JSON.stringify(this.state.missions))

            this.setState({
                editMissionOpened: !this.state.editMissionOpened
            })


        }

        let addNewMission = () => {


            let randNum = Math.random()

            let mission = {
                title: document.querySelector('#missionTitle').value,
                text: document.querySelector('#missionText').value,
                isDone: false,
                mId: randNum,

            }

            if(document.querySelector('#missionTitle').value === '' || document.querySelector('#missionText').value === ''){
                alert('Please fill in both fields')
            }
            else{
                this.state.missions.push(mission)
                document.querySelector('#missionTitle').value = ''
                document.querySelector('#missionText').value = ''
    
                this.setState({
                    newMissionOpened: false
                })
    
                localStorage.setItem('msn', JSON.stringify(this.state.missions))
            }
        }

        let deleteMission = (e) => {

            let missionPosition

            for (let i = 0; i < this.state.missions.length; i++) {
                if (this.state.missions[i].mId.toString() === e.target.parentElement.parentElement.parentElement.id.toString()) {
                    missionPosition = i
                }
            }

            let newArray = this.state.missions
            newArray.splice(missionPosition, 1)
            this.setState({
                mission: newArray
            })
            localStorage.setItem('msn', JSON.stringify(this.state.missions))
        }

        let completeMission = (e) => {

            let missionPosition

            for (let i = 0; i < this.state.missions.length; i++) {
                if (this.state.missions[i].mId.toString() === e.target.parentElement.parentElement.parentElement.id.toString()) {
                    missionPosition = i
                }
            }

            let newArray = this.state.missions

            if (newArray[missionPosition].isDone === true) {
                newArray[missionPosition].isDone = false
                this.setState({
                    mission: newArray
                })
                localStorage.setItem('msn', JSON.stringify(this.state.missions))
            }
            else {
                newArray[missionPosition].isDone = true
                this.setState({
                    mission: newArray
                })
                localStorage.setItem('msn', JSON.stringify(this.state.missions))
            }
        }

        let hideAddBtn = () => {
            if (this.state.editMissionOpened) {
                return "hide"
            }
            else {
                if (this.state.newMissionOpened) {
                    return "addNewMissionWindowOpen addNewMissionWindowBtnOpen"
                }
                else {
                    return "addNewMissionWindowBtn"
                }
            }
        }


        return (

            <div className="appContainer">

                {/* Background video */}
                <video autoPlay muted loop>
                    <source src={videoBg} type="video/mp4" />
                </video>

                <div className="toDo">


                    {/* ----- HEADER -----*/}
                    <div className={this.state.newMissionOpened || this.state.editMissionOpened ? 'header mainInactive' : 'header '}>
                        <img src={logo} alt="" />
                        <div className="header__border">
                            <p className="header__title">TASK TRACKER</p>
                            <div className="header__tdContainer">
                                <p className="day"></p> <p className="time"></p>
                            </div>
                            <div className="header__tdContainer">
                                <p className="date"></p> <p className="city">Nigh City</p>
                            </div>
                            
                              <div className="header__counterContainer">
                                 <img src={activeMissions} alt="" />
                                <span className="missionNumber">{countCompletedMissions()}</span>
                              </div>
                          
                        </div>
                    </div>

                    {/* ------ CARDS SECTION ------ */}

                    <div className={this.state.newMissionOpened === true || this.state.editMissionOpened ? 'main mainInactive' : 'main'}>

                        {
                            this.state.missions.map(item => (
                                <div className={item.isDone ? 'mission  missionCompleted' : 'mission'} id={item.mId}>
                                    <p className="mission__title" id="mTitle">{item.title}</p>
                                    <p className="mission__text" id="mText">{item.text}</p>
                                    <div className="mission__edit">
                                        <div className="mission__edit_icons">
                                            <img src={deleteBtnField} alt="" onClick={deleteMission} />
                                            <img src={editBtnField} alt="" onClick={openEditWindow} />
                                            <img src={completeBtnField} alt="" onClick={completeMission} />
                                        </div>
                                        <div className="mission__status"><span className="status">Status:</span> <span className={item.isDone ? 'statusCompleted' : 'statusNotCompleted'}>{item.isDone ? 'Completed' : 'Ongoing'}</span></div>
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>

                    {/* ----- FOOTER -----*/}
                    <div className={this.state.newMissionOpened || this.state.editMissionOpened ? 'footer footerMissionOpen' : 'footer'} >

                        <div className={this.state.newMissionOpened === false ? "newMissionWindowClosed newMissionWindow" : "newMissionWindow"}>
                            <input type="text" name="" id="missionTitle" placeholder="Enter Mission Title" />
                            <textarea name="" id="missionText" cols="30" rows="10" placeholder="Enter Mission Description" ></textarea>
                        </div>

                        <div className={this.state.editMissionOpened === false ? "newMissionWindowClosed newMissionWindow" : "newMissionWindow"}>
                            <input type="text" name="" id="missionTitleEdit" />
                            <textarea name="" id="missionTextEdit" cols="30" rows="10" ></textarea>
                        </div>
                        <img src={addBtn} onClick={addNewMission} className={this.state.newMissionOpened ? ' addNewMissionBtn' : 'addNewMissionBtnClosed'} alt="" />
                        <img src={editBtn} onClick={changeToEditedText} className={this.state.editMissionOpened ? 'editBtn' : 'editBtnHidden'} alt="" />
                        <img src={mainBtn} onClick={NewMissionWindow} className={hideAddBtn()} alt="" />
                        <img src={mainBtn} onClick={changeToEditedText} className={this.state.editMissionOpened ? 'addNewMissionWindowOpen addNewMissionWindowBtnOpen' : 'hide'} alt="" />
                    </div>

                </div>
            </div>
        );
    }
}

export default todo;