def fizzbuzz():
    """Prints the FizzBuzz sequence from 1 to 30."""
    for i in range(1, 31):
        output = ""
        if i % 3 == 0:
            output += "Fizz"
        if i % 5 == 0:
            output += "Buzz"
        print(output if output else str(i))

if __name__ == "__main__":
    fizzbuzz()