const ExpenseSchema = require('../models/expenseModel')

//ADD expense METHOD
exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            res.status(400).json({message: 'Amount must be a positie number'})
        }
        //saving to the database
        await expense.save()
        res.status(200).json({message: 'expense saved!'})

    } catch (error) {
      res.status(500).json({message: "Server Error!!"})   
    }

    console.log(expense)
} 


//GET expense METHOD

exports.getExpense = async(req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)

    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}


//DELETE expense METHOD

exports.deleteExpense = async(req, res) => {
     const {id} = req.params
    
     
     ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: "expense Deleted"})
        })
        .catch ((err) => {
            res.status(500).json({message: "Server Error"})
        })     
}