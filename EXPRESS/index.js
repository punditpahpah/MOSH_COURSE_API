

const Joi = require('joi')
const express = require('express');
const app = express();
app.use(express.json());

const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];


//HTTP GET REQUEST.................

app.get('/', (req, res) => {
    res.send('Hello World')
    res.end()
});

app.get('/api/courses', (req, res) => {
    // res.send('These are the courses')
    res.send(courses)
});


//handling request
app.post('/api/courses', (req, res) => {

    const { error } = ValidateCourse(req.body);
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})



//update request
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const { error } = ValidateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message); // Fix typo here
    }

    course.name = req.body.name;
    res.send(course);
});

function ValidateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
    });
    return schema.validate(course);
}



//examples of route parameter
//examples 1
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    res.send(course)
});


//example 2
app.get('/api/posts/:month/:year', (req, res) => {
    res.send(req.params)
});

//examples of query string parameters
//example 1
app.get('/api/posts/:month/:year?sortBy=name', (req, res) => {
    res.send(req.query)
});


//http delete request....
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    const index = courses.indexOf(course);
    const deletedCourse = courses.splice(index, 1)[0];
    res.send(deletedCourse);

});

const port = process.env.PORT || 1000
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

