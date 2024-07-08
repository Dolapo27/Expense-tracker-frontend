const IncomeSchema = require('../models/incomeModel')

//ADD INCOME METHOD
exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date } = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income saved!'})

    } catch (error) {
      res.status(500).json({message: "Server Error!!"})   
    }

    console.log(income)
} 


//GET INCOME METHOD

exports.getIncomes = async(req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)

    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}


//DELETE INCOME METHOD

exports.deleteIncome = async(req, res) => {
     const {id} = req.params

     IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income Deleted"})
        })
        .catch ((err) => {
            res.status(500).json({message: "Server Error"})
        })     
}