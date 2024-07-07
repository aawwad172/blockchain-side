const express = require("express");
const { Web3 } = require("web3");
require("dotenv").config();

const app = express();
const port = 3000;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const contractAddress = process.env.CONTRACT_ADDRESS;
const yourMetaMaskAddress = process.env.YOUR_METAMASK_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

const contractABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "candidateId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		name: "CandidateAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "candidateId",
				type: "uint256",
			},
		],
		name: "CandidateDeleted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "title",
				type: "string",
			},
		],
		name: "ElectionCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "ElectionDeleted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "candidateId",
				type: "uint256",
			},
		],
		name: "VoteCast",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "addCandidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_title",
				type: "string",
			},
			{
				internalType: "string",
				name: "_startDate",
				type: "string",
			},
			{
				internalType: "string",
				name: "_endDate",
				type: "string",
			},
		],
		name: "createElection",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_candidateId",
				type: "uint256",
			},
		],
		name: "deleteCandidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "deleteElection",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "elections",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "string",
				name: "startDate",
				type: "string",
			},
			{
				internalType: "string",
				name: "endDate",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "numberOfCandidates",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalVotes",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "electionsCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllElections",
		outputs: [
			{
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]",
			},
			{
				internalType: "string[]",
				name: "titles",
				type: "string[]",
			},
			{
				internalType: "string[]",
				name: "startDates",
				type: "string[]",
			},
			{
				internalType: "string[]",
				name: "endDates",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "numberOfCandidates",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "totalVotes",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_candidateId",
				type: "uint256",
			},
		],
		name: "getCandidate",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "votes",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "getCandidates",
		outputs: [
			{
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]",
			},
			{
				internalType: "string[]",
				name: "names",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "votes",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getElectionCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "getElectionDetails",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "electionTitle",
				type: "string",
			},
			{
				internalType: "string",
				name: "startDate",
				type: "string",
			},
			{
				internalType: "string",
				name: "endDate",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "numberOfCandidates",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalVotes",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "getWinner",
		outputs: [
			{
				internalType: "string",
				name: "winnerName",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_candidateId",
				type: "uint256",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

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
