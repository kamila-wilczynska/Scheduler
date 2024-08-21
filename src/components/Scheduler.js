// import React, { useState, useEffect, useCallback } from "react";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import {
//   Scheduler,
//   DayView,
//   WeekView,
//   MonthView,
//   Appointments,
//   AppointmentTooltip,
//   AppointmentForm,
//   DragDropProvider,
//   Toolbar,
//   ViewSwitcher,
//   DateNavigator,
//   TodayButton as DefaultTodayButton,
// } from "@devexpress/dx-react-scheduler-material-ui";
// import {
//   ViewState,
//   EditingState,
//   IntegratedEditing,
// } from "@devexpress/dx-react-scheduler";
// import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../utils";
// // import { db } from "../firebaseConfig";
// // import { collection, getDocs } from "firebase/firestore";

// // Styled Paper with border
// const StyledPaper = styled(Paper)({
//   border: "2px solid #3a86ff",
//   borderRadius: "12px",
//   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//   padding: "10px",
//   margin: "20px",
// });

// const TodayButton = (props) => (
//   <DefaultTodayButton {...props} messages={{ today: "Dziś" }} />
// );

// const App = () => {
//   const [data, setData] = useState([]);
//   const [currentViewName, setCurrentViewName] = useState("Month");
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Test Firestore connection
//   //   useEffect(() => {
//   //     const testFirestore = async () => {
//   //       try {
//   //         const querySnapshot = await getDocs(collection(db, "events"));
//   //         console.log(
//   //           "Firestore connection test - fetched events:",
//   //           querySnapshot.docs.map((doc) => doc.data())
//   //         );
//   //       } catch (error) {
//   //         console.error("Firestore connection test failed:", error);
//   //       }
//   //     };

//   //     testFirestore();
//   //   }, []);

//   useEffect(() => {
//     const loadData = async () => {
//       const events = await fetchEvents();
//       setData(events);
//     };
//     loadData();
//   }, []);

//   const handleCurrentDateChange = useCallback((date) => {
//     setCurrentDate(date);
//   }, []);

//   const handleCurrentViewNameChange = useCallback((viewName) => {
//     setCurrentViewName(viewName);
//   }, []);

//   const onCommitChanges = useCallback(async ({ added, changed, deleted }) => {
//     if (added) {
//       try {
//         const newEvent = {
//           title: added.title || "Nowe wydarzenie",
//           startDate: added.startDate,
//           endDate: added.endDate,
//           location: added.location || "No location",
//         };
//         await addEvent(newEvent);
//         const events = await fetchEvents();
//         setData(events);
//       } catch (error) {
//         console.error("Error adding event:", error);
//       }
//     }
//     if (changed) {
//       try {
//         const changedId = Object.keys(changed)[0];
//         await updateEvent(changedId, changed[changedId]);
//         const events = await fetchEvents();
//         setData(events);
//       } catch (error) {
//         console.error("Error updating event:", error);
//       }
//     }
//     if (deleted !== undefined) {
//       try {
//         await deleteEvent(deleted);
//         const events = await fetchEvents();
//         setData(events);
//       } catch (error) {
//         console.error("Error deleting event:", error);
//       }
//     }
//   }, []);

//   return (
//     <StyledPaper>
//       <Scheduler data={data} locale="pl" height={660} width={500}>
//         <ViewState
//           currentDate={currentDate}
//           currentViewName={currentViewName}
//           onCurrentDateChange={handleCurrentDateChange}
//           onCurrentViewNameChange={handleCurrentViewNameChange}
//         />
//         <EditingState onCommitChanges={onCommitChanges} />
//         <IntegratedEditing />
//         <DayView startDayHour={9} endDayHour={19} />
//         <WeekView startDayHour={9} endDayHour={19} />
//         <MonthView />
//         <Toolbar />
//         <DateNavigator />
//         <TodayButton />
//         <ViewSwitcher />
//         <Appointments />
//         <AppointmentTooltip showOpenButton showDeleteButton />
//         <AppointmentForm />
//         <DragDropProvider />
//       </Scheduler>
//     </StyledPaper>
//   );
// };

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  Toolbar,
  DateNavigator,
  TodayButton as DefaultTodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../utils";
import plMessages from "devextreme/localization/messages/pl.json";
import { loadMessages, locale } from "devextreme/localization";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

// Load Polish localization messages
loadMessages(plMessages);
locale("pl");

const StyledPaper = styled(Paper)({
  border: "2px solid #3a86ff",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  margin: "10px",
});

const TodayButton = (props) => (
  <DefaultTodayButton {...props} messages={{ today: "Dziś" }} />
);

const App = () => {
  const [data, setData] = useState([]);
  const [currentViewName, setCurrentViewName] = useState("Month");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      const events = await fetchEvents();
      setData(events);
    };
    loadData();
  }, []);

  const handleCurrentDateChange = useCallback((date) => {
    setCurrentDate(date);
  }, []);

  const handleCurrentViewNameChange = useCallback((event) => {
    setCurrentViewName(event.target.value);
  }, []);

  const onCommitChanges = useCallback(async ({ added, changed, deleted }) => {
    if (added) {
      try {
        const newEvent = {
          title: added.title || "Nowe wydarzenie",
          startDate: added.startDate,
          endDate: added.endDate,
          location: added.location || "Brak lokalizacji",
        };
        await addEvent(newEvent);
        const events = await fetchEvents();
        setData(events);
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
    if (changed) {
      try {
        const changedId = Object.keys(changed)[0];
        await updateEvent(changedId, changed[changedId]);
        const events = await fetchEvents();
        setData(events);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
    if (deleted !== undefined) {
      try {
        await deleteEvent(deleted);
        const events = await fetchEvents();
        setData(events);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  }, []);

  return (
    <StyledPaper>
      <Scheduler data={data} locale="pl" height={660} width={500}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentDateChange={handleCurrentDateChange}
          onCurrentViewNameChange={setCurrentViewName}
        />
        <EditingState onCommitChanges={onCommitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} />
        <WeekView startDayHour={9} endDayHour={19} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <FormControl component="fieldset">
          <FormLabel component="legend">Wybierz widok</FormLabel>
          <RadioGroup
            row
            aria-label="view"
            name="view"
            value={currentViewName}
            onChange={handleCurrentViewNameChange}
          >
            <FormControlLabel value="Day" control={<Radio />} label="Dzień" />
            <FormControlLabel
              value="Week"
              control={<Radio />}
              label="Tydzień"
            />
            <FormControlLabel
              value="Month"
              control={<Radio />}
              label="Miesiąc"
            />
          </RadioGroup>
        </FormControl>
        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
          messages={{
            detailsLabel: "Szczegóły",
            editLabel: "Edytuj",
            deleteLabel: "Usuń",
            allDayLabel: "Cały dzień",
          }}
        />
        <AppointmentForm
          messages={{
            detailsLabel: "Szczegóły",
            allDayLabel: "Cały dzień",
            titleLabel: "Tytuł",
            commitCommand: "Zapisz",
            cancelCommand: "Anuluj",
            moreInformationLabel: "Więcej informacji",
            repeatLabel: "Powtórz",
          }}
        />
        <DragDropProvider />
      </Scheduler>
    </StyledPaper>
  );
};

export default App;
