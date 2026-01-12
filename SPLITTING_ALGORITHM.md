# Expense Splitting Algorithm

This document explains the algorithm used in Split-It to calculate expense splits and generate settlement reports.

## Overview

The algorithm maintains a balance array (`report[]`) where each index represents a user's current balance:
- **Positive balance**: User is owed money (they paid more than their share)
- **Negative balance**: User owes money (they paid less than their share)
- **Zero balance**: User has paid their fair share

## 1. Expense Splitting Algorithm

When a user adds a new expense, the algorithm updates balances for all group members.

### Pseudo-Algorithm

```
FUNCTION addExpense(payerIndex, amount, participants[], report[])
    countParticipants = COUNT(participants WHERE checked == true)
    
    IF countParticipants == 0 THEN
        RETURN ERROR("At least one participant required")
    END IF
    
    FOR each user i in group:
        IF i == payerIndex THEN
            // Payer's balance update
            IF payer is included in participants THEN
                // Payer gets reimbursed by others
                report[i] += (amount * (countParticipants - 1)) / countParticipants
            ELSE
                // Payer pays full amount, no reimbursement
                report[i] += amount
            END IF
        ELSE
            // Other participants' balance update
            IF user i is included in participants THEN
                // User owes their share
                report[i] -= amount / countParticipants
            END IF
        END IF
    END FOR
END FUNCTION
```

### Example

**Scenario**: Alice pays ₹300 for dinner, split between Alice, Bob, and Charlie (3 people)

- **Initial balances**: [0, 0, 0]
- **Calculation**:
  - Alice (payer, included): `report[0] += (300 * (3-1)) / 3 = 200`
  - Bob (included): `report[1] -= 300 / 3 = -100`
  - Charlie (included): `report[2] -= 300 / 3 = -100`
- **Final balances**: [200, -100, -100]

**Meaning**: Alice is owed ₹200 (she paid ₹300 but should have paid ₹100), Bob owes ₹100, Charlie owes ₹100.

## 2. Settlement Algorithm

The settlement algorithm minimizes the number of transactions needed to settle all debts.

### Pseudo-Algorithm

```
FUNCTION generateSettlements(report[], usernames[])
    // Create list of [balance, userIndex] pairs
    tempList = []
    FOR i = 0 to report.length - 1:
        tempList.push([report[i], i])
    END FOR
    
    // Sort by balance (ascending: most negative first)
    SORT tempList BY balance
    
    // Recursively settle debts
    WHILE tempList is not empty:
        minBalance = tempList[0][0]  // Most negative (owes most)
        maxBalance = tempList[last][0]  // Most positive (owed most)
        
        IF minBalance >= 0 THEN
            BREAK  // All debts settled
        END IF
        
        // Calculate settlement amount
        IF abs(minBalance) > maxBalance THEN
            amount = maxBalance
            tempList[last][0] = 0
            tempList[0][0] += amount
        ELSE
            amount = abs(minBalance)
            tempList[0][0] = 0
            tempList[last][0] -= amount
        END IF
        
        // Record settlement
        PRINT: usernames[tempList[0][1]] + " should pay " + amount + " to " + usernames[tempList[last][1]]
        
        // Remove settled entries and continue
        IF tempList[0][0] == 0 THEN
            REMOVE tempList[0]
        END IF
        IF tempList[last][0] == 0 THEN
            REMOVE tempList[last]
        END IF
        
        RE-SORT tempList
    END WHILE
END FUNCTION
```

### Example

**Scenario**: Final balances are [150, -50, -100]

1. **Sort**: [-100, -50, 150]
2. **First settlement**: 
   - Charlie (owes ₹100) pays ₹100 to Alice (owed ₹150)
   - Updated: [-50, 50]
3. **Second settlement**:
   - Bob (owes ₹50) pays ₹50 to Alice (owed ₹50)
   - Updated: [0, 0]
4. **Result**: 
   - "Charlie should pay ₹100 to Alice"
   - "Bob should pay ₹50 to Alice"

## 3. Edit/Delete Transaction Algorithm

When editing or deleting a transaction, the algorithm reverses the original transaction's effect, then applies the new values.

### Pseudo-Algorithm

```
FUNCTION updateTransaction(oldTransaction, newAmount, newParticipants[])
    // Reverse old transaction
    FOR each user i:
        // Subtract old transaction's effect
        IF i == oldPayerIndex THEN
            IF oldPayer was included THEN
                report[i] -= (oldAmount * (oldCount - 1)) / oldCount
            ELSE
                report[i] -= oldAmount
            END IF
        ELSE
            IF user i was included in old participants THEN
                report[i] += oldAmount / oldCount
            END IF
        END IF
    END FOR
    
    // Apply new transaction (same as addExpense)
    addExpense(newPayerIndex, newAmount, newParticipants[], report[])
END FUNCTION
```

## Key Properties

1. **Fairness**: Expenses are always split equally among selected participants
2. **Transparency**: Each transaction's impact on balances is clearly calculated
3. **Minimal Settlements**: The settlement algorithm minimizes the number of transactions needed
4. **Reversibility**: Edits and deletes correctly reverse previous calculations

## Time Complexity

- **Adding Expense**: O(n) where n = number of group members
- **Settlement Generation**: O(k log k) where k = number of non-zero balances
- **Edit/Delete**: O(n) for reversing + O(n) for applying = O(n)

## Space Complexity

- **Balance Array**: O(n) where n = number of group members
- **Settlement List**: O(k) where k = number of non-zero balances
