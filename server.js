import express from "express";
import { Web3 } from "web3";
import cors from "cors";
import { ContractABI } from "./ContractABI.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const contractAddress = process.env.CONTRACT_ADDRESS;
const yourMetaMaskAddress = process.env.YOUR_METAMASK_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

const contractABI = ContractABI.data;

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

// Custom JSON stringify to handle BigInt
app.set("json replacer", (key, value) => {
	return typeof value === "bigint" ? value.toString() : value;
});

async function sendTransaction(data) {
	try {
		console.log("Preparing transaction...");
		const nonce = await web3.eth.getTransactionCount(
			yourMetaMaskAddress,
			"latest"
		); // get latest nonce
		console.log(`Nonce: ${nonce}`);
		const gasEstimate = await web3.eth.estimateGas({
			from: yourMetaMaskAddress,
			to: contractAddress,
			data: data,
		});
		console.log(`Gas Estimate: ${gasEstimate}`);
		const gasPrice = await web3.eth.getGasPrice(); // get the current gas price
		console.log(`Gas Price: ${gasPrice}`);

		const tx = {
			from: yourMetaMaskAddress,
			to: contractAddress,
			nonce: nonce,
			gas: gasEstimate,
			gasPrice: gasPrice,
			data: data,
		};

		const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
		console.log("Transaction signed");
		const receipt = await web3.eth.sendSignedTransaction(
			signedTx.rawTransaction
		);
		console.log("Transaction sent");
		return receipt;
	} catch (error) {
		console.error("Error in sendTransaction:", error);
		throw error;
	}
}
app.get("/elections", async (req, res) => {
	try {
		const elections = await contract.methods.getAllElections().call();
		console.log("Elections retrieved successfully");

		const {
			ids,
			titles,
			startDates,
			endDates,
			numberOfCandidates,
			totalVotes,
		} = elections;

		console.log("Elections retrieved successfully", elections);
		const allElections = [];

		for (let i = 0; i < ids.length; i++) {
			let election = {
				id: ids[i],
				title: titles[i],
				startDate: startDates[i],
				endDate: endDates[i],
				numberOfCandidates: numberOfCandidates[i],
				totalVotes: totalVotes[i],
			};
			allElections.push(election);
		}

		res.json(allElections);
	} catch (error) {
		console.error("Error fetching all elections:", error);
		res.status(500).send(error.toString());
	}
});
app.post("/election", async (req, res) => {
	console.log("POST /election called");
	try {
		const { title, startDate, endDate } = req.body;
		console.log(
			`Creating election with title: ${title}, startDate: ${startDate}, endDate: ${endDate}`
		);
		const data = contract.methods
			.createElection(title, startDate, endDate)
			.encodeABI();
		const result = await sendTransaction(data);
		console.log("Election created successfully");
		res.json(result);
	} catch (error) {
		console.error("Error creating election:", error);
		res.status(500).send(error.toString());
	}
});

app.get("/election/:id", async (req, res) => {
	console.log(`GET /election/${req.params.id} called`);
	try {
		const electionId = req.params.id;
		const election = await contract.methods
			.getElectionDetails(electionId)
			.call();
		console.log("Election details retrieved successfully");
		res.json(election);
	} catch (error) {
		console.error(
			`Error retrieving election details for ID ${req.params.id}:`,
			error
		);
		res.status(500).send(error.toString());
	}
});

app.get("/election/:id/candidates", async (req, res) => {
	console.log(`GET /election/${req.params.id}/candidates called`);
	try {
		const electionId = req.params.id;
		const candidates = await contract.methods.getCandidates(electionId).call();
		console.log("Candidates retrieved successfully");
		res.json(candidates);
	} catch (error) {
		console.error(
			`Error retrieving candidates for election ID ${req.params.id}:`,
			error
		);
		res.status(500).send(error.toString());
	}
});

app.post("/election/:id/vote", async (req, res) => {
	console.log(`POST /election/${req.params.id}/vote called`);
	try {
		const electionId = req.params.id;
		const { candidateId } = req.body;
		console.log(
			`Voting for candidate ID: ${candidateId} in election ID: ${electionId}`
		);
		const data = contract.methods.vote(electionId, candidateId).encodeABI();
		const result = await sendTransaction(data);
		console.log("Vote cast successfully");
		res.json(result);
	} catch (error) {
		console.error(`Error casting vote in election ID ${req.params.id}:`, error);
		res.status(500).send(error.toString());
	}
});

app.post("/election/:id/candidate", async (req, res) => {
	console.log(`POST /election/${req.params.id}/candidate called`);
	try {
		const electionId = req.params.id;
		const { name } = req.body;
		console.log(
			`Adding candidate with name: ${name} to election ID: ${electionId}`
		);
		const data = contract.methods.addCandidate(electionId, name).encodeABI();
		const result = await sendTransaction(data);
		console.log("Candidate added successfully");
		res.json(result);
	} catch (error) {
		console.error(
			`Error adding candidate to election ID ${req.params.id}:`,
			error
		);
		res.status(500).send(error.toString());
	}
});

app.delete("/election/:id/candidate/:candidateId", async (req, res) => {
	console.log(
		`DELETE /election/${req.params.id}/candidate/${req.params.candidateId} called`
	);
	try {
		const electionId = req.params.id;
		const candidateId = req.params.candidateId;
		console.log(
			`Deleting candidate ID: ${candidateId} from election ID: ${electionId}`
		);
		const data = contract.methods
			.deleteCandidate(electionId, candidateId)
			.encodeABI();
		const result = await sendTransaction(data);
		console.log("Candidate deleted successfully");
		res.json(result);
	} catch (error) {
		console.error(
			`Error deleting candidate ID ${candidateId} from election ID ${electionId}:`,
			error
		);
		res.status(500).send(error.toString());
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
