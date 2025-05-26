export class ContractABI {
	static data = [
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

	constructor() {
		throw new Error("You can instantiate from a static class");
	}
}
