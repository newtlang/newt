import random

def rh3o4d6():
  rolls = [random.randint(1, 6) for _ in range(4)]
  rolls.sort()
  rolls.pop(0)
  return sum(rolls)

def roll_3d6():
  return sum(random.randint(1, 6) for _ in range(3))

def rstats_4d6(): 
  arr = []
  for _ in range(6):
    while True:
      num = rh3o4d6()
      if num >= 8:
        break
    arr.append(num)
  arr.sort()
  return arr

def rstats_3d6():
  arr = []
  for _ in range(6):
    while True:
      rolls = [random.randint(1, 6) for _ in range(3)]
      num = sum(rolls)
      if num >= 8:
        break
    arr.append(num)
  return arr

def rstd():
  arr = [15, 14, 13, 12, 10, 8]
  random.shuffle(arr)
  return arr

def rpb():
  points = 27
  stats = [8, 8, 8, 8, 8, 8]
  while points > 0:
    index = random.randint(0, 5)
    if stats[index] < 15:
      cost = 1 if stats[index] < 13 else 2
      if points >= cost:
        stats[index] += 1
        points -= cost
  return stats


def r272523():
  stats = [0] * 6
  
  stats[0] = max(rh3o4d6(), 9)
  stats[1] = max(rh3o4d6(), 7)
  stats[2] = max(rh3o4d6(), 5)
  
  stats[3] = 27 - stats[0]
  stats[4] = 25 - stats[0]
  stats[5] = 23 - stats[0]
  
  return stats
  

def rcustom_v1():
  
  arr = []
  
  # budget = 76-40
  budget = 33
  for _ in range(4):
    while True:
      num = rh3o4d6()
      if num >= 8:
        break
    arr.append(num)
  arr.sort(reverse=True)
  budget = budget - sum(arr[:2])
  
  part1 = random.randint(0, min(budget, 10)) if budget > 0 else 0
  part2 = min(budget - part1, 10) if budget - part1 > 0 else 0
  arr.append(part1 + 8)
  arr.append(part2 + 8)
  return arr

def rcustom_v2():
  arr = [8] * 2
  
  max_score = 76
  budget = max_score - 42
  
  for _ in range(4):
    while True:
      num = rh3o4d6()
      if num >= 8:
        break
    arr.append(num)
  
  arr.sort(reverse=True)
  res = budget - sum(arr[:2])
  
  if res > 0:
    if res > 0:
      increment = min(res, 10 - arr[-1])
      arr[-1] += increment
      res -= increment
  else:
    for i in range(2, len(arr)):
      if res == 0:
        break
      if arr[i] + res > 8:
        decrement = min(res, arr[i] - 8)
        arr[i] -= decrement
        res -= decrement

  
  return arr
  
  

if __name__ == "__main__":
  count = 0
  cp8 = 0
  beats_std = 0
  beats_pb = 0
  total = 0
  
  stats = [0] * 6
  dist = {num: 0 for num in range(1, 21)}
  
  for i in range(0, 100000):
    temp_stats = rcustom_v2()
    # for j in range(0, 6):
      # temp_stats.append(r272523())
    temp_stats.sort()
    
    # print(temp_stats)
    # if temp_stats[0] >=10:
    #   cp8 += 1
    
    # if sum(temp_stats) > 72:
    #   beats_std += 1
    
    # if sum(temp_stats) > 69:
    #   beats_pb += 1
      
    
    for i in range(len(temp_stats)):
      stats[i] += temp_stats[i]
      dist[temp_stats[i]] += 1
    # print(temp_stats)
    count += 1
  

  for item in stats:
    print(f"Stat:       {round(item / count):>5}") 
    total += round(item / count)
    
  print(f"\nAverage Score: {total}")
  print(f"Iterations: {count:>5}\n") 
    
  # print(f"% all positive: {round(cp8 / count * 100, 2):>5}")
  # print(f"vs Std:         {round(beats_std / count * 100, 2):>5}")
  # print(f"vs PB:          {round(beats_pb / count * 100, 2):>5}")

  print("Value | Count | Percentage")
  print("--------------------------")
  for value, count in sorted(dist.items()):
      percentage = (count / sum(dist.values())) * 100
      print(f"{value:5} | {count:5} | {percentage:9.2f}%")

  # print("Value,Count,Percentage")
  # for value, count in sorted(dist.items()):
  #     percentage = (count / sum(dist.values())) * 100
  #     print(f"{value},{count},{percentage:.2f}%")
