import {
  GETPROPOSAL_ATTEMPT, GETPROPOSAL_FAILED, GETPROPOSAL_SUCCESS,
  UPDATEVOTECHOICE_ATTEMPT, UPDATEVOTECHOICE_SUCCESS, UPDATEVOTECHOICE_FAILED,
  GETTOKEN_INVENTORY_SUCCESS, GETPROPROSAL_UPDATEVOTESTATUS_ATTEMPT,
  GETPROPROSAL_UPDATEVOTESTATUS_SUCCESS, GETPROPROSAL_UPDATEVOTESTATUS_FAILED,
  GETTOKEN_INVENTORY_ATTEMPT, DISABLE_POLITEIA_SUCCESS, COMPARE_INVENTORY_SUCCESS,
  REMOVED_PROPOSALS_FROM_LIST
} from "actions/GovernanceActions";
import {
  CLOSEWALLET_SUCCESS
} from "actions/WalletLoaderActions";
import { WALLETREADY } from "actions/DaemonActions";

export default function governance(state = {}, action) {
  switch (action.type) {
  case GETTOKEN_INVENTORY_ATTEMPT:
    return { ...state,
      getProposalsAttempt: true
    };
  case GETTOKEN_INVENTORY_SUCCESS:
    return { ...state,
      inventory: action.inventory,
      getProposalsAttempt: false
    };
  case CLOSEWALLET_SUCCESS:
    return { ...state,
      getProposalsAttempt: false,
      getProposalError: null,
      proposals: null,
      inventory: null
    };
  case GETPROPROSAL_UPDATEVOTESTATUS_ATTEMPT:
    return { ...state,
      getProposalsAttempt: true
    };
  case GETPROPROSAL_UPDATEVOTESTATUS_SUCCESS:
    return { ...state,
      proposals: { ...action.proposals },
      getProposalsAttempt: false
    };
  case GETPROPROSAL_UPDATEVOTESTATUS_FAILED:
    return { ...state,
      getProposalsAttempt: false,
      getProposalError: state.error
    };
  case GETPROPOSAL_ATTEMPT:
    return { ...state, getProposalsAttempt: true, getProposalError: null };
  case GETPROPOSAL_FAILED:
    return { ...state, getProposalsAttempt: false, getProposalError: state.error };
  case GETPROPOSAL_SUCCESS:
    return { ...state,
      getProposalsAttempt: false,
      proposalsDetails: { ...state.proposalsDetails,
        [action.token]: { ...action.proposal }
      },
      proposals: { ...action.proposals }
    };
  case UPDATEVOTECHOICE_ATTEMPT:
    return { ...state, updateVoteChoiceAttempt: true };
  case UPDATEVOTECHOICE_SUCCESS:
    return {
      ...state,
      proposals: { ...action.proposals },
      updateVoteChoiceAttempt: false,
      proposalsDetails: { ...state.proposalsDetails,
        [action.token]: { ...action.proposal }
      }
    };

  case UPDATEVOTECHOICE_FAILED:
    return { ...state, updateVoteChoiceAttempt: false };
  case WALLETREADY:
    return { ...state,
      lastPoliteiaAccessTime: action.lastPoliteiaAccessTime,
      lastPoliteiaAccessBlock: action.lastPoliteiaAccessBlock
    };
  case DISABLE_POLITEIA_SUCCESS:
    return { ...state,
      inventory: [],
      proposals: {
        activeVote: [],
        abandonedVote: [],
        preVote: [],
        finishedVote: []
      }
    };
  case COMPARE_INVENTORY_SUCCESS:
    return { ...state,
      inventory: action.inventory
    };
  case REMOVED_PROPOSALS_FROM_LIST:
    return { ...state,
      proposals: action.proposals
    };
  default:
    return state;
  }
}
