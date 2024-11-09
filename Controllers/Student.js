// THIS FILE CONTROLLERS THE STUDENTS API ROUTES
const Student = require("../Schema/Student")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
JWT_SECRET="SAIT@MAJORPROJECT"

const studentsignup=async(req,res)=>{
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
        }

        const newStud = new Student({
            fullname,
            email,
            password,
          });
          await newStud.save();
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      }
const studentlogin = async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await Student.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
        );
        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
          },
          token: token
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    


module.exports= {
    studentsignup,
    studentlogin
}