class authController {
async registration(req, res) {
	try {
		
	} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Registration error'})
	}
}

async login(req, res) {
	try {
			
	} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Login error'})
	}
}

async getUsers(req, res) {
	res.json("server work+");
	} catch (e) {
			console.log(e)
	}
}


export default new authController();