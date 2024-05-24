
const Category = require('../model/catrgory');
const create = async (req, res) => {
    try {
        console.log(req.body);
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(200).json({ category: savedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const categoryById=async (req, res, next,id)=>{
    try {
        
        const category = await Category.findById(id).exec();
        if (!category) {
            return res.status(404).json({ error: 'Category Id  not found' });
        }
        req.category = category;
        
        next()
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
}

const read = async(req, res) => {
    return res.json(req.category);
};


const update=async(req,res)=>{
    try {
        console.log('req.body', req.body);
        console.log('category update param', req.params.categoryId);

        const category = req.category;
        category.name = req.body.name;

        const updatedCategory = await category.save();

        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const category = req.category;
        const removedCategory = await Category.deleteOne();
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const list = async (req, res) => {
    try {
       
        const categories = await Category.find().exec();

       
        res.json(categories);
    } catch (error) {
      
        res.status(400).json({ error: errorHandler(error) });
    }
};
module.exports = { create ,categoryById,read,remove,update,list}; 