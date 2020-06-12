
import React, { Component } from 'react';


export class PnkProvider extends React.Component {
constructor(props)
{
    super(props);
    this.state = {
        stateChange:1,
        GetData :  this.GetData,
        GetDetached: this.GetDetached,
        SetData : this.SetData,
        BroadCast : this.BroadCast
      }
 
    

  this._state = { pnkstate:  props.store } ;



      

     // alert(JSON.stringify(this._state));
}



//GetData : this.GetData,
    
    
    //HandleIncrement : this.Increment,
    //HandleDecrement : this.Decrement,
     
//BroadCast : this.BroadCast,


GetDetached = (keyState) => {

  if (keyState === undefined)
  {
    let data = Object.assign({},this._state.pnkstate);
    return  data;
  }


  return Object.assign({},this._state.pnkstate[keyState]);

}


GetData = (keyState) => {

  if (keyState === undefined)
  return  this._state.pnkstate;


  return this._state.pnkstate[keyState];


}

/*
GetStore = () => {

  if (keyState == undefined)
  return 
  this.state._state;


  return this.state._state.store[keyState];



}
*/


BroadCast = () => {

    //alert('in broadcast');
    this.setState({stateChange : this.state.stateChange + 1});


}



SetData = (keyState, newValue ) => {

  //let _myState = this.state._state;
  //Object.assign()
  //let modifyState = {keyState:newValue};
  //alert(JSON.stringify(modifyState),null,4);
  
  let newState = Object.assign({},this._state);
  newState.pnkstate[keyState] = newValue;
  this._state = newState;
  //alert('state changed ' +    JSON.stringify(newState) );
  
  //alert('state changed ' +    JSON.stringify(this.GetData()) );
  //this._state[keyState] = newState;

}




Increment = () => {
    //age = myGlobal.age 
    //alert('hi....');
    
   this.SetData('age' , this.GetData('age') + 1 );
   this.BroadCast();
}
Decrement = () => {

    this.SetData('age' , this.GetData('age') - 1 );
    this.BroadCast();

}

render() {

  //alert("in pnk provider");
  // alert( "IN pnk Provide" + JSON.stringify(this.passToChildren,null,4));
    return (
    // <div>
           

           <pnkContext.Provider value={this.state} >
            {
                this.props.children
            }
            </pnkContext.Provider>

           

    // </div>
    );


}

}

export const PnkConnect = (Component,keyStates) =>
  class PnkConnect extends React.Component {
    
    constructor(props){
      super(props);
      this.keyStates = keyStates;
      
    }

    render() {
      return (
        
        <pnkContext.Consumer>
          {PnkStore =>
              
              <div>
                {/* {"in consumer in connect" + JSON.stringify(PnkStore.GetData('name'),null,4)} */}

            <ConnectFilter PnkStore={PnkStore} keyStates={this.keyStates} myComp={Component} componentprops={this.props} />
              </div>
            
          }
        </pnkContext.Consumer>
      );
    }
  }


  export class ConnectFilter extends React.Component {
      constructor(props)
      {
        super(props);

        
        this.wetherStateChange = true;

        //alert(typeof(props.keyStates));
        this.keyStates = Array();
        this.newState = Array();
        if (Array.isArray((props.keyStates)))
        {
         //alert("in connect filter for component "+ "\n" + "array" + props.myComp );
          this.keyStates =  props.keyStates;
        }
        else
        {
          //pr
          // alert("in connect filter for component " + "\n" + "string"+ props.myComp );
          this.keyStates[0] = props.keyStates;
          this.newState[0] = props.PnkStore.GetData(this.keyStates[0]);


        }

        for (var i = 0; i < this.keyStates.length; i++ )
        {

          this.newState[i] = props.PnkStore.GetData(this.keyStates[i]);
        }

       // alert("in connect filter for component "+ props.myComp+ "\n" +JSON.stringify(this.newState));
        
        //this.newState[i] = nextProps.PnkStore.GetData(this.keyStates[i]);

      }

      shouldComponentUpdate(nextProps) {

        this.wetherStateChange = false;
        this.keyStates = nextProps.keyStates;

        this.keyStates = Array();
        if (Array.isArray(nextProps.keyStates))
        {
          this.keyStates =  nextProps.keyStates;
        }
        else
        this.keyStates[0] = nextProps.keyStates;

       // this.newState = nextProps.pnkContext;

      //  alert("this.props=" + JSON.stringify(this.props) + "\n" + "nextProps=" + JSON.stringify(nextProps));

       //alert(JSON.stringify(nextProps.PnkStore.GetData(this.keyStates)) + "\n"+  JSON.stringify(this.newState));
       let flg = false;
       for (var i = 0; i < this.keyStates.length; i++ )
       {

        //alert( JSON.stringify(nextProps.PnkStore.GetData(this.keyStates[i])) + "\n"+ JSON.stringify(this.newState[i]) + nextProps.myComp );
        if (nextProps.PnkStore.GetData(this.keyStates[i]) !== this.newState[i] )
        {

          this.wetherStateChange = true;
          this.newState[i] = nextProps.PnkStore.GetData(this.keyStates[i]);

          //alert('true in ' + nextProps.myComp);
         flg = true;
          
        }
        else
        {
            //alert('false in ' + nextProps.myComp);
           
            

        }
      }
      //alert("for component-" + this.props.myComp + " -" + (flg?"true":"false"));
      return flg;

      }

      componentWillUpdate(nextProps) {

        

        
        


      }
      componentDidUpdate() {



      }

      componentDidMount() {



      }

      render() {

        //alert("component being rendered" + this.props.myComp);

        if (this.wetherStateChange)
        {
         // alert("component being rendered" + this.props.myComp);
            return (
  
  
              // <this.props.myComp PnkStore={this.props.PnkStore}  componentprops={this.props.componentprops} />
              <this.props.myComp {...this.props} />




            );


        }

        
        


      }



  }


  export const pnkContext = React.createContext();