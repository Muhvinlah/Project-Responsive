package cloudcode.helloworld.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/** Defines a controller to handle HTTP requests */
@Controller
public final class HelloWorldController {
  @GetMapping("/")
  public String helloWorld(Model model) {

    // Get Cloud Run environment variables.
    String revision = System.getenv("K_REVISION") == null ? "???" : System.getenv("K_REVISION");
    String service = System.getenv("K_SERVICE") == null ? "???" : System.getenv("K_SERVICE");

    // Set variables in html template.
    model.addAttribute("revision", revision);
    model.addAttribute("service", service);
    return "index";
  }

  @GetMapping("/login")
  public String login() {
      // Logic for handling the login page
      return "login"; // Resolves to 'templates/login.html'
  }

  @GetMapping("/register")
  public String register() {
      // Logic for handling the register page
      return "register"; // Resolves to 'templates/register.html'
  }

  @GetMapping("/upload")
  public String edit() {
      // Logic for handling the register page
      return "edit"; // Resolves to 'templates/register.html'
  }

  @GetMapping("/news")
  public String news() {
      // Logic for handling the news page
      return "berita"; // Resolves to 'templates/news.html'
  }

  @GetMapping("/admin")
  public String admin() {
    return "admin";
  }

  // @GetMapping("/topic/{topicId}")
  // public String topic(@PathVariable Long topicId, Model model) {
  //   // Logic for handling the topic pages
  //   // Example: Fetch topic details from service layer based on topicId
  //   model.addAttribute("topicId", topicId);
  //   return "topic"; // Resolves to 'templates/topic.html'
  // }
}