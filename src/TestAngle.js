import React from "react";
import "./TestAngle.css";

export default class TestAngle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Minute: "",
      Hour: "",
      AngleOfMinuteHand: "",
      AngleOfHourHand: "",
      AngleOfBetweenMHandH: "",
      resolveSucessCheck: false,
    };
  }

  handleValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  inputValueOfMinuteHandandHourHand = () => {
    return (
      <div className="form-input">
        <label>Nhập giờ (từ 0 đến 23):</label>
        <input
          type="text"
          value={this.state.Hour}
          name="Hour"
          onChange={(event) => this.handleValueChange(event)}
        ></input>
        <br></br>
        <label>Nhập phút (từ 0 đến 59):</label> &nbsp;
        <input
          type="text"
          value={this.state.Minute}
          name="Minute"
          onChange={(event) => this.handleValueChange(event)}
        ></input>
        <br></br>
        <input
          type="button"
          value="Tính Góc"
          onClick={() => {
            this.resolveAngleOfMinuteHandandHourHand();
          }}
        ></input>
      </div>
    );
  };

  resolveAngleOfMinuteHandandHourHand = () => {
    let HourTmp = 0;
    let MinuteTmp = 0;

    if (12 <= Number(this.state.Hour) && Number(this.state.Hour) < 24) {
      HourTmp = Number(this.state.Hour) - 12;
    } else if (0 <= Number(this.state.Hour) && Number(this.state.Hour) < 12) {
      HourTmp = Number(this.state.Hour);
    }

    if (0 <= Number(this.state.Minute) && Number(this.state.Minute) < 60) {
      MinuteTmp = Number(this.state.Minute);
    }

    let AngleMinuteHandTmp = (MinuteTmp / 60) * 360;
    let AngleHourHandTmp =
      (HourTmp / 12) * 360 + (MinuteTmp / 60) * ((5 / 60) * 360);

    let AngleBetweenMHandHTmp = 0;

    if (AngleHourHandTmp > AngleMinuteHandTmp) {
      AngleBetweenMHandHTmp = AngleHourHandTmp - AngleMinuteHandTmp;
    } else {
      AngleBetweenMHandHTmp = AngleMinuteHandTmp - AngleHourHandTmp;
    }

    if (AngleBetweenMHandHTmp >= 180) {
      AngleBetweenMHandHTmp = 360 - AngleBetweenMHandHTmp;
    }

    if (
      0 <= Number(this.state.Hour) &&
      Number(this.state.Hour) < 24 &&
      0 <= Number(this.state.Minute) &&
      Number(this.state.Minute) < 60 &&
      this.state.Hour !== "" &&
      this.state.Minute !== ""
    ) {
      this.setState({
        AngleOfMinuteHand: AngleMinuteHandTmp,
        AngleOfHourHand: AngleHourHandTmp,
        AngleOfBetweenMHandH: AngleBetweenMHandHTmp,
        resolveSucessCheck: true,
      });
    } else {
      this.setState({
        AngleOfMinuteHand: AngleMinuteHandTmp,
        AngleOfHourHand: AngleHourHandTmp,
        AngleOfBetweenMHandH: AngleBetweenMHandHTmp,
        resolveSucessCheck: false,
      });
    }
  };

  renderAngleOfMinuteHandandHourHand = () => {
    return (
      <div className="form-result">
        <p>
          Lấy ra góc của kim giờ:
          <label>{this.state.AngleOfHourHand}</label> độ
        </p>
        <p>
          Lấy ra góc của kim phút:
          <label> {this.state.AngleOfMinuteHand} </label> độ
        </p>
        <p>
          Lấy ra góc của kim giờ và kim phút:
          <label>{this.state.AngleOfBetweenMHandH} </label> độ
        </p>
      </div>
    );
  };

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        {this.inputValueOfMinuteHandandHourHand()}
        {this.state.resolveSucessCheck ? (
          this.renderAngleOfMinuteHandandHourHand()
        ) : (
          <small
            style={{
              textAlign: "left",
              color: "red",
              margin: "0 0 0 12px",
              userSelect: "none",
            }}
          >
            Vui lòng nhập đúng giá trị !!!!
          </small>
        )}
      </div>
    );
  }
}
