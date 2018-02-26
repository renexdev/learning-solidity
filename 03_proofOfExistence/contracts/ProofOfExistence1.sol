pragma solidity ^0.4.15;

// Proof of Existence contract, version 1
contract ProofOfExistence1 {
  // state
  bytes32 public proof;

  // calculate and store the proof for a document
  // *transactional function*
  function notarize(string document) {
    proof = proofFor(document);
  }

  // helper function to get a document's sha256
  // *read-only function*   //Next, we call the read-only (constant) function proofFor. Remember to mark your read-only functions with the keyword constant, or else Truffle will try to craft a transaction to execute them. This is a way to tell Truffle that we’re not interacting with the blockchain but just reading from it. By using this read-only function, we obtain the sha256 hash of the ‘An amazing idea’ “document”.

  function proofFor(string document) constant returns (bytes32) {
    return sha256(document);
  }
}