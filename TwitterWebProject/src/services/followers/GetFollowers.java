package services.followers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import services.ServicesTools;
import services.errors.ServerErrors;

public class GetFollowers extends HttpServlet{

private static final long serialVersionUID = 7428447883130442228L;
	
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		JSONObject answer;
		
		Integer userId = null; 
		
		userId = Integer.parseInt(req.getParameter(ServicesTools.USER_ID_ARG));
		
		if(!ServicesTools.nullChecker(userId)) {
			answer = FollowerUtils.getUsersFollowers(userId);
		} else {
			answer = ServicesTools.createJSONError(ServerErrors.MISSING_ARGUMENT);
		}
		
		ServicesTools.addCORSHeader(resp);
		
		PrintWriter out = resp.getWriter();
		out.write(answer.toJSONString());
		resp.setContentType("text/plain");
	}
}
