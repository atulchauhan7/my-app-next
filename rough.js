/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    // Length of the array
    let n = nums.length;

    // =========================
    // STEP 1: Place each number
    // in its correct index
    // =========================
    for (let i = 0; i < n; i++) {

        // Keep swapping until:
        // 1) nums[i] is positive
        // 2) nums[i] is within range [1, n]
        // 3) nums[i] is NOT already in its correct position
        while (
            nums[i] > 0 &&                 // Ignore negatives & zero
            nums[i] <= n &&                // Ignore numbers > n
            nums[nums[i] - 1] !== nums[i] // Avoid infinite swap (duplicates)
        ) {

            // Correct index for value nums[i]
            let correctIndex = nums[i] - 1;

            // Swap nums[i] with the value at its correct position
            // This puts nums[i] closer to where it should be
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        }
    }

    // =========================
    // STEP 2: Find first index
    // where number is incorrect
    // =========================
    for (let i = 0; i < n; i++) {

        // If the value at index i is not (i + 1),
        // then (i + 1) is missing from the array
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    // =========================
    // STEP 3: If all numbers
    // from 1 to n are present
    // =========================
    // Then the missing number is n + 1
    return n + 1;
};
console.log(firstMissingPositive([3,4,-1,1]));
