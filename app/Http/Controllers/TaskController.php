<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class TaskController extends Controller
{
  private $min_length_of_task = 4;

  public function index()
  {
      return Task::orderBy("created_at", "DESC")->get();
  }

  public function create()
  {

  }

  public function store(Request $request)
  {
    $new_task = new Task();

    if (isset($request->task["description"])) {
      $is_set_time_limit = DB::table("tasks")->where("description", $request->task["description"])->value("description");

      if (isset($is_set_time_limit)) {
        return "You have task with current description";
      } else {
        $description = $request->task["description"];
        if (strlen($description) >= 4) {
          $new_task->description = $description;
        } else {
          return "Task must have at least {$this->min_length_of_task} letters. Now " . strlen($description);
        }
      }
    }

    if (isset($request->task["timeLimit"])) {
      $time_limit = $request->task["timeLimit"];
      $new_task->time_to_complete = $time_limit;
    }

    $new_task->save();

    return $new_task;
  }


  public function show($id)
  {

  }

  public function edit(Request $request, $id)
  {
    $selecting_task = Task::find($id);
    if (isset($selecting_task)) {
      $selecting_task->description = $request->task["description"];
      $selecting_task->updated_at = $request->task["updated_at"];
      $selecting_task->save();

      return $selecting_task;
    }

    return "Task description not found";
  }


  public function update(Request $request, $id)
  {
    $existing_task = Task::find($id);

    if (isset($existing_task)) {
      $existing_task->completed = $request->task["completed"];
      $existing_task->completed_at = $request->task["completed"] ? Carbon::now() : null;
      $existing_task->save();

      return $existing_task;
    }

    return "Task not found.";
  }

  public function updateAll(Request $request) {
    $tasks = DB::table("tasks")->where([
      ["completed", "!==", true],
      ["time_to_complete", "!=", "00:00:00"],
      ["time_to_complete", "!=", null]
    ])->get();

    if (count($tasks) > 0) {
      foreach ($request->task["data"] as $key => $value) {
        Task::where("id", $value["id"])->update(["time_to_complete" => $value["limit"]]); 
      }
    } else {
      return "You have no task with for update time";
    }
    return "Task updated";
  }

  public function destroy($id) {
    $existing_task = Task::find($id);
    if (isset($existing_task)) {
      $existing_task->delete();
      return "Task successfully deleted";
    }

    return "Task not found.";
  }
}
