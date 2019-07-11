import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import ZFormPage from './pages/Form2/ZFormPage';
import ZHomePage from './pages/Home/ZHomePage';
import ZStudentsPage from './pages/Students/ZStudentsPage';
// import ZCoursesPage from './pages/Courses/ZCoursesPage';
import ZTemplatesPage from './pages/Templates/ZTemplatesPage';
import ZNoPage from './pages/NoPage/ZNoPage';
import ZCertifactePage from './pages/Certificate/ZCertificatePage';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      listStudents: [],
      listCourses: [],
      selectedStudent: {},
      selectedTemplate: 1,
      // selectedColor: 'red', // red by default
      // red: '#db3d44',
      // blue: '#02C8FA',
      // green: '#57B894',
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.selectTemplate = this.selectTemplate.bind(this);

    //fetch data for students
    let urlStudents = 'https://zertify-server.herokuapp.com/api/students/';
    fetch(urlStudents)
      .then(response => response.json())
      .then(data => {
        this.setState({
          listStudents: data.students,
          //listCourses: data.courses
        });
        console.log('fetch students data ', this.state.listStudents);
      })
      .catch(error => console.log('error: ', error));

    //fetch data for courses
    let urlCourses = 'https://zertify-server.herokuapp.com/api/courses/';
    fetch(urlCourses)
      .then(response => response.json())
      .then(data => {
        this.setState({
          listCourses: data.courses,
        });
        console.log('fetch courses data ', this.state.listCourses);
      })
      .catch(error => console.log('error: ', error));
  }

  /** update the state of the selected student in the list via its id (number)  */
  selectStudent(id) {
    const selectedStudent = this.state.listStudents.find(
      student => student.id === id,
    );
    this.setState({selectedStudent});
    //console.log('active student', selectedStudent);
  }

  //////////////////////////////////
  /** update the state of the selected template via its css color class */
  selectTemplate(index) {
    this.setState({selectedTemplate: index});
  }

  // setColor() {
  //   if (template one selected) {
  //     return  selectedColor = green;
  //   } else if  (template two selected) {
  //     return selectedColor = blue
  //   } else if (template three selected) {
  //     return selectedColor = red
  //   } else { return red }
  //   this.setState({selectedColor});
  // }
  //////////////////////////////////

  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={ZHomePage} />
            <Route
              path='/students'
              render={() => (
                <ZStudentsPage
                  listStudents={this.state.listStudents}
                  selectStudent={this.selectStudent}
                />
              )}
            />
            <Route
              path='/form'
              render={() => <ZFormPage listCourses={this.state.listCourses} />}
            />
            <Route
              path='/templates'
              render={() => (
                <ZTemplatesPage
                  selectTemplate={this.selectTemplate}
                  selectedTemplate={this.state.selectedTemplate}
                />
              )}
            />
            <Route
              path='/certificate'
              render={() => (
                <ZCertifactePage selectedStudent={this.state.selectedStudent} />
              )}
            />
            <Route component={ZNoPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
